import { Router } from "express";
import {
  adminLogin,
  createAdmin,
} from "../controllers/admin.controller";


const router = Router();

// Admin login
router.post("/login", adminLogin);

// Create admin
router.post("/create",  createAdmin);
// router.post("/refresh", refreshAccessToken);

export default router;
