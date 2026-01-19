// src/routes/survey.routes.ts
import { Router } from "express";
import { Container } from "../di/container";
import { adminAuth } from "../middleware/auth.middleware";

const router = Router();
const surveyController = Container.getSurveyController();

// Public route - Submit survey
router.post("/", surveyController.submitSurvey);

// Protected routes - Admin only
router.get("/", adminAuth, surveyController.getAllSurveys);
router.get("/:id", adminAuth, surveyController.getSurveyById);

export default router;