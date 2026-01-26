import { IFieldValidator } from "./interfaces/Ivalidator";

export class EmailValidator implements IFieldValidator {
  validate(value: string): { isValid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, error: "Invalid email format" };
    }
    return { isValid: true };
  }
}