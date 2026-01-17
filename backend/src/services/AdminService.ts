
import bcrypt from "bcryptjs";
import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { CreateAdminDTO, LoginAdminDTO, AdminAuthResponseDTO } from "../dto/AdminDTO";
import { generateToken } from "../utils/tocken";
import { Admin } from "../entities/Admin";

export class AdminService {
  constructor(private adminRepository: IAdminRepository) {}

  async createAdmin(dto: CreateAdminDTO): Promise<AdminAuthResponseDTO> {
    // Validate input
    if (!dto.name || !dto.email || !dto.password) {
      throw new Error("Name, email and password are required");
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(dto.email)) {
      throw new Error("Invalid email format");
    }

    // Check if admin exists
    const existingAdmin = await this.adminRepository.findByEmail(dto.email);
    if (existingAdmin) {
      throw new Error("Admin with this email already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // Create admin
    const admin = await this.adminRepository.create(
      dto.name,
      dto.email,
      hashedPassword
    );

    // Generate token
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
    // Validate input
    if (!dto.email || !dto.password) {
      throw new Error("Email and password are required");
    }

    // Find admin by email
    const admin = await this.adminRepository.findByEmail(dto.email);
    if (!admin) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isMatch = await this.adminRepository.comparePassword(admin, dto.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate token
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