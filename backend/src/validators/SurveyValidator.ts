import { CreateSurveyDTO } from "../dto/SurveyDTO";
import { IFieldValidator } from "./interfaces/Ivalidator";

export class SurveyValidator {
  private validators: Map<string, IFieldValidator[]> = new Map();

  registerValidator(field: string, validator: IFieldValidator): void {
    if (!this.validators.has(field)) {
      this.validators.set(field, []);
    }
    this.validators.get(field)!.push(validator);
  }

  validate(data: CreateSurveyDTO): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    for (const [field, validators] of this.validators.entries()) {
      const value = (data as any)[field];
      
      for (const validator of validators) {
        const result = validator.validate(value);
        if (!result.isValid) {
          errors[field] = result.error!;
          break; // Stop at first error for this field
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}