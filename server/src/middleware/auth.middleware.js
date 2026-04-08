import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      throw new Error("Unauthorized user");
    }

    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await UserModel.findById(decode.id).select("-password");

    if (!user) throw new Error("Something went wronnt");

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in auth middleware");
  }
};
