// src/repositories/AdminRepository.ts
import { AdminModel, IAdminDocument } from "../models/Admin";
import { Admin } from "../entities/Admin";
import { IAdminRepository } from "./interfaces/IAdminRepository";



export class AdminRepository implements IAdminRepository {
  async findById(id: string): Promise<Admin | null> {
    const admin = await AdminModel.findById(id);
    return admin ? this.toEntity(admin) : null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await AdminModel.findOne({ email: email.toLowerCase() });
    return admin ? this.toEntity(admin) : null;
  }

  async create(name: string, email: string, hashedPassword: string): Promise<Admin> {
    const admin = await AdminModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });
    return this.toEntity(admin);
  }

  async comparePassword(admin: Admin, candidatePassword: string): Promise<boolean> {
    // Fetch the document to use the instance method
    const adminDoc = await AdminModel.findById(admin.id);
    if (!adminDoc) {
      throw new Error("Admin not found");
    }
    return adminDoc.comparePassword(candidatePassword);
  }

  private toEntity(doc: IAdminDocument): Admin {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}