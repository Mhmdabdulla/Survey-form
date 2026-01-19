import { Admin } from "../../entities/Admin";

export interface IAdminRepository {
  findById(id: string): Promise<Admin | null>;
  findByEmail(email: string): Promise<Admin | null>;
  create(name: string, email: string, hashedPassword: string): Promise<Admin>;
  comparePassword(admin: Admin, candidatePassword: string): Promise<boolean>;
}