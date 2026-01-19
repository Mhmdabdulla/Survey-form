// src/routes/admin.routes.ts
import { Router } from "express";
import { Container } from "../di/container";

const router = Router();
const adminController = Container.getAdminController();

// Admin routes
router.post("/login", adminController.login);
router.post("/create", adminController.createAdmin);

export default router;