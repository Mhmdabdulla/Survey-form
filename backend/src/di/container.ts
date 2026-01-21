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

import { SurveyValidator } from "../validators/SurveyValidator";
import { EmailValidator } from "../validators/EmailValidator";
import { PhoneValidator } from "../validators/PhoneValidator";
import { RequiredFieldValidator } from "../validators/RequiredFieldValidator";
import { GenderValidator } from "../validators/GenederValidator";



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


  static getSurveyValidator(): SurveyValidator {
    if (!this.instances.has("SurveyValidator")) {
      const validator = new SurveyValidator();
      
      // Register all field validators
      // Name validation
      validator.registerValidator('name', new RequiredFieldValidator('Name'));
      
      // Email validation
      validator.registerValidator('email', new RequiredFieldValidator('Email'));
      validator.registerValidator('email', new EmailValidator());
      
      // Phone validation
      validator.registerValidator('phone', new RequiredFieldValidator('Phone'));
      validator.registerValidator('phone', new PhoneValidator());
      
      // Gender validation
      validator.registerValidator('gender', new RequiredFieldValidator('Gender'));
      validator.registerValidator('gender', new GenderValidator());
      
      // Nationality validation
      validator.registerValidator('nationality', new RequiredFieldValidator('Nationality'));
      
      // Address validation
      validator.registerValidator('address', new RequiredFieldValidator('Address'));
      
      // You can easily add more validators here without modifying existing code
      // validator.registerValidator('phone', new PhoneFormatValidator('+91'));
      // validator.registerValidator('email', new EmailDomainValidator(['gmail.com', 'yahoo.com']));
      
      this.instances.set("SurveyValidator", validator);
    }
    return this.instances.get("SurveyValidator");
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
      const validator = this.getSurveyValidator();
      this.instances.set("SurveyService", new SurveyService(repository, validator));
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