import { Router } from "express";
import {
  adminLogin,
  createAdmin,
  refreshAccessToken
} from "../controllers/admin.controller.js";


const router = Router();

// Admin login
router.post("/login", adminLogin);

// Create admin
router.post("/create",  createAdmin);
router.post("/refresh", refreshAccessToken);

export default router;
