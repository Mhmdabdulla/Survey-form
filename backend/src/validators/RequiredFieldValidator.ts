import { IFieldValidator } from "./interfaces/Ivalidator";

export class RequiredFieldValidator implements IFieldValidator {
  constructor(private fieldName: string) {}
  
  validate(value: any): { isValid: boolean; error?: string } {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { isValid: false, error: `${this.fieldName} is required` };
    }
    return { isValid: true };
  }
}
