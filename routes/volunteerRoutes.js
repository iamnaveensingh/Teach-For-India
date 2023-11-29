import express from "express";
import {
  adminLogin,
  candidatesList,
  loginstatus,
  volunteerRegister,
} from "../controllers/volunteer.js";
import { auth } from "../middlewares/authMiddleware.js";

// router object

const router = express.Router();

// volunteer registration
router.post("/register", volunteerRegister);

// Geting list of volunteers
router.get("/candidatesList", auth, candidatesList);

// Geting list of volunteers
router.get("/admin-loginstatus", auth, loginstatus);

// admin login
router.post("/admin", adminLogin);
export default router;
