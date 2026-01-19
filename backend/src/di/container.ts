//Admin
import {  AdminRepository } from "../repositories/AdminRepository";
import {  AdminService } from "../services/AdminService";
import {  AdminController } from "../controllers/AdminController";
import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import { IAdminService } from "../services/interfaces/IAdminService";
import { IAdminController } from "../controllers/interfaces/IAdminController";

//Survey
import {  SurveyRepository } from "../repositories/SurveyRepository";
import {  SurveyService } from "../services/SurveyService";
import {  SurveyController } from "../controllers/SurveyController";
import { ISurveyRepository } from "../repositories/interfaces/ISurveyRepository";
import { ISurveyService } from "../services/interfaces/ISurveyService";
import { ISurveyController } from "../controllers/interfaces/ISurveyController";

export class Container {
  private static instances = new Map();

  // Admin dependencies
  static getAdminRepository(): IAdminRepository {
    if (!this.instances.has("AdminRepository")) {
      this.instances.set("AdminRepository", new AdminRepository());
    }
    return this.instances.get("AdminRepository");
  }

  static getAdminService(): IAdminService {
    if (!this.instances.has("AdminService")) {
      const repository = this.getAdminRepository();
      this.instances.set("AdminService", new AdminService(repository));
    }
    return this.instances.get("AdminService");
  }

  static getAdminController(): IAdminController {
    if (!this.instances.has("AdminController")) {
      const service = this.getAdminService();
      this.instances.set("AdminController", new AdminController(service));
    }
    return this.instances.get("AdminController");
  }

  // Survey dependencies
  static getSurveyRepository(): ISurveyRepository {
    if (!this.instances.has("SurveyRepository")) {
      this.instances.set("SurveyRepository", new SurveyRepository());
    }
    return this.instances.get("SurveyRepository");
  }

  static getSurveyService(): ISurveyService {
    if (!this.instances.has("SurveyService")) {
      const repository = this.getSurveyRepository();
      this.instances.set("SurveyService", new SurveyService(repository));
    }
    return this.instances.get("SurveyService");
  }

  static getSurveyController(): ISurveyController {
    if (!this.instances.has("SurveyController")) {
      const service = this.getSurveyService();
      this.instances.set("SurveyController", new SurveyController(service));
    }
    return this.instances.get("SurveyController");
  }

  // Clear all instances (useful for testing)
  static clear(): void {
    this.instances.clear();
  }
}