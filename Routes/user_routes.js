import { Router } from "express";
import * as usercontroller from "../Controllers/authcontroller.js";

const router=Router();
router.post("/register",usercontroller.register);
router.post("/login",usercontroller.login);

export default router