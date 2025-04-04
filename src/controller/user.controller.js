import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { BaseException } from "../exception/base.exception.js";
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_SECRET,
} from "../config/jwt.config.js";

const register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const foundedUser = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (foundedUser) {
      throw new BaseException(
        "User already exists, try another email or phone number",
        409
      );
    }

    const passwordHash = await hash(password, 10);

    const user = await userModel.create({
      email,
      phoneNumber,
      name,
      password: passwordHash,
    });

    res.status(201).send({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new BaseException("User not found", 404);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new BaseException("Invalid password", 401);
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        algorithm: "HS256",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        algorithm: "HS256",
      }
    );

    res.send({
      message: "success",
      tokens: {
        accessToken,
        refreshToken,
      },
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate({
      path: "orders",
      populate: {
        path: "orderItems",
        populate: "food",
      },
    });

    res.send({
      message: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
      algorithm: "HS256",
    });

    const newRefreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
      algorithm: "HS256",
    });

    res.send({
      message: "success",
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new BaseException("Refresh token expired", 422));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new BaseException("Invalid refresh token", 400));
    } else {
      next(error);
    }
  }
};

export default { register, getAllUsers, login, refresh };
