import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
