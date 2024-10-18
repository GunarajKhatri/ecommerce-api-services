import { Router } from "express";
import * as Todo from "../controllers/todocontroller.js"
const router=Router();
router.get("/",Todo.index);
router.post("/", Todo.create);
router.delete("/:id", Todo.destroy);
router.patch("/:id", Todo.update);

export default router;