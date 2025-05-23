import { Request, Response } from "express";
import User from "../model/user";
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, password });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.header("Authorization", `Bearer ${token}`);

    const { password: _, ...safeUser } = newUser.toObject();

    res.status(HTTPStatus.CREATED).json({ safeUser, token });
  } catch (err) {
    console.error("Registration error:", err);
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
      .json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.header("Authorization", `Bearer ${token}`);

    const { password: _, ...safeUser } = user.toObject();

    res.status(HTTPStatus.OK).json({ user: safeUser, token });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};
