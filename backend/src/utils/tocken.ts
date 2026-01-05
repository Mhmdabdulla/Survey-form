import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const TOKEN = process.env.TOKEN_SECRET!;

export const generateAccessToken = (payload: { id: string; name: string }) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateToken = (payload: { id: string; name: string }) => {
  console.log(
    "Generating refresh token with payload:",
    payload, TOKEN
  );
  return jwt.sign(payload, TOKEN, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, TOKEN) as {
    id: string;
    name: string;
  };
};
