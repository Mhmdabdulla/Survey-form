import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { STATUS_CODES } from "../utils/constants.js";


export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.split(" ")[1];

    if (!accessToken) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as { userId: string };

    // Attach user info (admin)
    req.admin = { id: decoded.userId };

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
