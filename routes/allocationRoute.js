import express from "express";
import  { unallocated, initiateAllocation } from "../controllers/allocationController.js";

const router = express.Router();

// test route
router.get("/allocate", initiateAllocation);
router.get("/unallocated", unallocated);

export default router;
