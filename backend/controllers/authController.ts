import { Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    res
      .status(HTTPStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Server configuration error" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000,
      path: "/",
    });

    res.status(HTTPStatus.OK).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  res.status(HTTPStatus.OK).json({ message: "Logged out successfully" });
};
