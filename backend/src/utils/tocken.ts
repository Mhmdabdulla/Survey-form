import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (payload: { id: string; name: string }) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: { id: string; name: string }) => {
  console.log(
    "Generating refresh token with payload:",
    payload, REFRESH_SECRET
  );
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as {
    id: string;
    name: string;
  };
};
