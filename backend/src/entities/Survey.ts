
export interface Survey {
  id: string;
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}