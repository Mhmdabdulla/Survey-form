
export interface CreateAdminDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginAdminDTO {
  email: string;
  password: string;
}

export interface AdminResponseDTO {
  id: string;
  name: string;
  email: string;
}

export interface AdminAuthResponseDTO {
  message: string;
  token: string;
  admin: AdminResponseDTO;
}