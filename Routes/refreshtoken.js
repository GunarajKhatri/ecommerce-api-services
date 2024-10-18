import { Router } from "express";
import { generateNewTokens } from "../Controllers/authcontroller.js";
const router=Router();
router.post("/refreshtoken",generateNewTokens);

export default router