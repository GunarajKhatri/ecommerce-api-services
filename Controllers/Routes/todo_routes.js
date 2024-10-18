import { Router } from "express";
import Todo from "../../Models/Todo";
const router=Router();

router.get("/", Todo.index);
router.post("/", Todo.create);
router.delete("/:id", Todo.destroy);
router.patch("/:id", Todo.update);