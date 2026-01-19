// src/services/AdminService.ts
import bcrypt from "bcryptjs";
import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { CreateAdminDTO, LoginAdminDTO, AdminAuthResponseDTO } from "../dto/AdminDTO";
import { generateToken } from "../utils/tocken";
import { Admin } from "../entities/Admin";
import { IAdminService } from "./interfaces/IAdminService";


export class AdminService implements IAdminService {
  constructor(private adminRepository: IAdminRepository) {}

  async createAdmin(dto: CreateAdminDTO): Promise<AdminAuthResponseDTO> {
    if (!dto.name || !dto.email || !dto.password) {
      throw new Error("Name, email and password are required");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(dto.email)) {
      throw new Error("Invalid email format");
    }

    const existingAdmin = await this.adminRepository.findByEmail(dto.email);
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const admin = await this.adminRepository.create(
      dto.name,
      dto.email,
      hashedPassword
    );

    const token = generateToken({
      id: admin.id,
      name: admin.name,
      email: admin.email
    });

    return {
      message: "Admin created successfully",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    };
  }

  async login(dto: LoginAdminDTO): Promise<AdminAuthResponseDTO> {
    if (!dto.email || !dto.password) {
      throw new Error("Email and password are required");
    }

    const admin = await this.adminRepository.findByEmail(dto.email);
    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await this.adminRepository.comparePassword(admin, dto.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      id: admin.id,
      name: admin.name,
      email: admin.email
    });

    return {
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    };
  }

  async getAdminById(id: string): Promise<Admin | null> {
    return await this.adminRepository.findById(id);
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    return await this.adminRepository.findByEmail(email);
  }
}