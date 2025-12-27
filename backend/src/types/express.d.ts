// import { IAdmin } from "../models/Admin.js";
export interface IAdmin  {
  id: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: Partial<IAdmin>;
    }
  }
}

export {};
