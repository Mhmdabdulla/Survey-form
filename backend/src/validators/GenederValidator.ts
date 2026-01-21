import { IFieldValidator } from "./interfaces/Ivalidator";

export class GenderValidator implements IFieldValidator {
  private allowedGenders = ['male', 'female', 'other', 'prefer_not_to_say'];
  
  validate(value: string): { isValid: boolean; error?: string } {
    if (!this.allowedGenders.includes(value.toLowerCase())) {
      return { isValid: false, error: "Invalid gender value" };
    }
    return { isValid: true };
  }
}