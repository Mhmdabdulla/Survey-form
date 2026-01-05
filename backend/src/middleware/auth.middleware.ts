import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { STATUS_CODES } from "../utils/constants";


export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    )  as {
    id: string;
    name: string;
  };

    // Attach user info (admin)
    req.admin = { id: decoded.id };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: "Token has expired" });
    }

    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ error: "Invalid token" });
  }
};
