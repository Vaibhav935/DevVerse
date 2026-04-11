import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model.js";
import {
  badRequest,
  customError,
  internalServerError,
  success,
} from "../../utils/response.utils.js";
import config from "../../config/config.js";
import asyncHandler from "../../utils/asyncHandler.js";

// ------------------------------------------ Register --
export const register = asyncHandler(async (req, res) => {
  try {
    console.log("req aai");
    console.log("check 1");
    const { email, username, password } = req.body;
    console.log("body ---", req.body);

    if (!email || !username || !password) {
      return customError(res, 400, {}, "All fields are required");
    }
    console.log("check 2");

    const isAlreadyExisted = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    console.log("check 3");
    if (isAlreadyExisted) {
      return customError(
        res,
        409,
        {},
        "User with is email or username already exists.",
      );
    }

    console.log("check 4");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    console.log("check 5");
    const refreshToken = jwt.sign(
      {
        id: newUser._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    newUser.refreshToken = refreshTokenHash;
    await newUser.save();

    const accessToken = jwt.sign(
      {
        id: newUser._id,
      },
      config.JWT_SECRETT,
      {
        expiresIn: "15m",
      },
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return success(
      res,
      {
        username: newUser.username,
        email: newUser.email,
        userId: newUser._id,
      },
      "User registered successfully",
    );
  } catch (error) {
    console.log("error in reg controller --", error);
  }
});

// ------------------------------------------ Login --
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Check 1");
  if (!email || !password) {
    return customError(res, 400, {}, "All fields are required");
  }

  console.log("Check 2");
  const user = await UserModel.findOne({ email });

  if (!user) {
    return customError(res, 404, {}, "Invalid email or password.");
  }

  console.log("Check 3");
  //   if (!user.verified) {
  //     return badRequest(res, {}, "Email not verified");
  //   }

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // console.log(isPasswordValid)

  // console.log("Check 4")
  // if (!isPasswordValid) {
  //   return customError(res, 400, {}, "Invalid email or password");
  // }

  console.log("Check 5");
  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  user.refreshToken = refreshTokenHash;
  await user.save();

  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("refreshToken", refreshToken, options);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return success(
    res,
    {
      username: user.username,
      email: user.email,
      userId: user._id,
    },
    "Logged in successfully.",
  );
});

// ------------------------------------------ GetMe --
export const getMe = asyncHandler(async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return customError(res, 401, {}, "Token not found.");
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  const user = await UserModel.findById(decoded.id);

  return success(
    res,
    {
      username: user.username,
      email: user.email,
      userId: user._id,
    },
    "User fetched",
  );
});

// ------------------------------------------ RefreshToken --
export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return customError(res, 401, {}, "refreshToken not found.");
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const user = await UserModel.findById(decoded.id);

  const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

  if (!isTokenValid) {
    return customError(res, 401, {}, "Invalid refresh token");
  }

  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

  user.refreshToken = newRefreshTokenHash;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("refreshToken", newRefreshToken, options);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return success(res, {}, "Access token refreshed");
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken, accessToken } = req.cookies;

  if (!refreshToken || !accessToken) {
    return customError(res, 400, {}, "Toke missing");
  }

  const user = await UserModel.findById(req.user.id);

  if (!user) {
    return customError(res, 404, {}, "User not found");
  }

  const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

  if (!isValid) {
    return customError(res, 400, {}, "Invalid token.");
  }

  user.refreshToken = "";
  await user.save();

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return success(res, {}, "Logged out successfully.");
});
