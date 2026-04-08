import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model.js";
import {
  badRequest,
  customError,
  success,
} from "../../utils/response.utils.js";

// ------------------------------------------ Register --
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return customError(res, 400, {}, "All fields are required");
  }

  const isAlreadyExisted = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyExisted) {
    return customError(
      res,
      409,
      {},
      "User with is email or username already exists.",
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const refreshToken = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const refreshTokenHash = await bcrypt(refreshToken, 10);

  const newUser = await UserModel.create({
    email,
    username,
    password: hashedPassword,
    refreshToken: refreshTokenHash,
  });

  const accessToken = jwt.sign(
    {
      id: newUser._id,
      sessionId: session._id,
    },
    process.env.JWT_SECRET,
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
    },
    "User registered successfully",
  );
};

// ------------------------------------------ Login --
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return customError(res, 400, {}, "All fields are required");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return customError(res, 404, {}, "Invalid email or password.");
  }

  if (!user.verified) {
    return badRequest(res, {}, "Email not verified");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const isPasswordValid = bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    return customError(res, 400, {}, "Invalid email or password");
  }

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

  return success(res, {}, "Logged in successfully.");
};

// ------------------------------------------ GetMe --
export const getMe = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return customError(res, 401, {}, "Token not found.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findById(decoded.id);

  return success(
    res,
    {
      username: user.username,
      email: user.email,
    },
    "User fetched",
  );
};

// ------------------------------------------ RefreshToken --
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return customError(res, 401, {}, "refreshToken not found.");
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const refreshTokenHash = await bcrypt(refreshToken, 10);

  const refreshExists = await UserModel.findOne({
    refreshTokenHash,
  });

  if (!refreshExists) {
    return customError(res, 401, {}, "Invalid refresh token");
  }

  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

  refreshExists.refreshToken = newRefreshTokenHash;
  await refreshExists.save();

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
};
