export interface IFieldValidator {
  validate(value: any): { isValid: boolean; error?: string };
}