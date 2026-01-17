// Admin
import { AdminRepository } from "../repositories/AdminRepository";
import { AdminService } from "../services/AdminService";
import { AdminController } from "../controllers/AdminController";

export class Container {
  private static instances = new Map();

  static getAdminRepository(): AdminRepository {
    if (!this.instances.has("AdminRepository")) {
      this.instances.set("AdminRepository", new AdminRepository());
    }
    return this.instances.get("AdminRepository");
  }

  static getAdminService(): AdminService {
    if (!this.instances.has("AdminService")) {
      const repository = this.getAdminRepository();
      this.instances.set("AdminService", new AdminService(repository));
    }
    return this.instances.get("AdminService");
  }

  static getAdminController(): AdminController {
    if (!this.instances.has("AdminController")) {
      const service = this.getAdminService();
      this.instances.set("AdminController", new AdminController(service));
    }
    return this.instances.get("AdminController");
  }

  // Clear all instances (useful for testing)
  static clear(): void {
    this.instances.clear();
  }
}