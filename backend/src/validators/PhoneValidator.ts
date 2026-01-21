import { IFieldValidator } from "./interfaces/Ivalidator";

export class PhoneValidator implements IFieldValidator {
  validate(value: string): { isValid: boolean; error?: string } {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(value)) {
      return { isValid: false, error: "Invalid phone format" };
    }
    return { isValid: true };
  }
}