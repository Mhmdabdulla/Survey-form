import { Router } from "express";
import {
  submitSurvey,
  getAllSurveys
} from "../controllers/survey.controller";
// import { adminAuth } from "../middleware/auth.middleware";

const router = Router();


router.post("/", submitSurvey);


// router.get("/", adminAuth, getAllSurveys);
router.get("/", getAllSurveys);

export default router;
