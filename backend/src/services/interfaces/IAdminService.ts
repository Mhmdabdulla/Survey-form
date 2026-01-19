import { CreateAdminDTO, LoginAdminDTO, AdminAuthResponseDTO } from "../../dto/AdminDTO";

import { Admin } from "../../entities/Admin";

export interface IAdminService {
  createAdmin(dto: CreateAdminDTO): Promise<AdminAuthResponseDTO>;
  login(dto: LoginAdminDTO): Promise<AdminAuthResponseDTO>;
  getAdminById(id: string): Promise<Admin | null>;
  getAdminByEmail(email: string): Promise<Admin | null>;
}