import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const TOKEN = process.env.TOKEN_SECRET!;


export interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  console.log(
    "Generating token with payload:",
    payload,
    "Secret:",
    TOKEN ? "present" : "missing"
  );
  
  if (!TOKEN) {
    throw new Error("JWT secret is not defined");
  }
  
  return jwt.sign(payload, TOKEN, { expiresIn: "7d" });
};

export const verifyToken = (token: string): TokenPayload => {
  if (!TOKEN) {
    throw new Error("JWT secret is not defined");
  }
  
  try {
    const decoded = jwt.verify(token, TOKEN) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Optional: Generate refresh token (longer expiry)
export const generateRefreshToken = (payload: TokenPayload): string => {
  if (!TOKEN) {
    throw new Error("JWT secret is not defined");
  }
  
  return jwt.sign(payload, TOKEN, { expiresIn: "30d" });
};
