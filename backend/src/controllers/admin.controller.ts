import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin";
import type { Request, Response } from "express";
import {  generateToken, } from "../utils/tocken";

interface AdminRequestBody {
  name: string;
  password: string;
}

export const createAdmin = async (req: Request<{}, {}, AdminRequestBody>, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and password required" });
    }

    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    //  HASH PASSWORD 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      password: hashedPassword
    });

    const token = generateToken({
      id: admin._id.toString(),
      name: admin.name
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000
    // });

    return res.status(201).json({
      message: "Admin created successfully",
      token: token,
      admin: {
        id: admin._id,
        name: admin.name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};


export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Name and password required" });
    }

    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin._id.toString(),
      name: admin.name
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// export const refreshAccessToken = async (req: Request, res: Response) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({ message: "Refresh token missing" });
//     }

//     const decoded = verifytoken(token);

//     const admin = await Admin.findById(decoded.id).select("-password");
//     if (!admin) {
//       return res.status(401).json({ message: "Admin not found" });
//     }

//     const accessToken = generateAccessToken({
//       id: admin._id.toString(),
//       name: admin.name
//     });

//     return res.status(200).json({
//       accessToken,
//       user: admin
//     });
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid refresh token" });
//   }
// };
