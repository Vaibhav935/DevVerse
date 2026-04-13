import jwt from "jsonwebtoken";
import { customError } from "../utils/response.utils.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return customError(res, 400, {}, "Unauthorized user");
    }

    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (!decode) throw new Error("Something went wronnt");

    req.user = {
      id: decode.id,
      username: decode.username,
    };

    return next();
  } catch (error) {
    if (error.name !== "TokenExpiredError" || !refreshToken) {
      return customError(res, 401, {}, "Authentication Invalid");
    }
    const { refreshToken } = req.cookies;

    try {
      const refreshPayload = jwt.verify(refreshToken, process.env.JWT_SECRET);

      const newAccessToken = jwt.sign(
        { userId: refreshPayload?.userId, name: refreshPayload?.name },
        process.env.JWT_SECRET,
        { expiresIn: "15m" },
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
      });
      req.user = { userId: refreshPayload.userId, name: refreshPayload.name };
      return next();
    } catch (error) {
      return customError(res, 401, {}, "Authentication Invalid");
    }
  }
};
