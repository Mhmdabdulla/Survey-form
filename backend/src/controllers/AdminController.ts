
import type { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/AdminService";
import { CreateAdminDTO, LoginAdminDTO } from "../dto/AdminDTO";

export class AdminController {
  constructor(private adminService: AdminService) {}

  createAdmin = async (
    req: Request<{}, {}, CreateAdminDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.adminService.createAdmin(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Admin with this email already exists") {
          return res.status(409).json({ message: error.message });
        }
        if (
          error.message === "Name, email and password are required" ||
          error.message === "Invalid email format"
        ) {
          return res.status(400).json({ message: error.message });
        }
      }
      next(error);
    }
  };

  login = async (
    req: Request<{}, {}, LoginAdminDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.adminService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid credentials") {
          return res.status(401).json({ message: error.message });
        }
        if (error.message === "Email and password are required") {
          return res.status(400).json({ message: error.message });
        }
      }
      next(error);
    }
  };
}