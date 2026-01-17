import type { Request, Response, NextFunction } from "express";
import { CreateAdminDTO, LoginAdminDTO } from "../../dto/AdminDTO";

export interface IAdminController {
  createAdmin(req: Request<{}, {}, CreateAdminDTO>, res: Response, next: NextFunction): Promise<Response | void>;
  login(req: Request<{}, {}, LoginAdminDTO>, res: Response, next: NextFunction): Promise<Response | void>;
}