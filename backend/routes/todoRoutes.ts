import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import * as todoController from "../controllers/todoController";

const router = express.Router();

router.use(authenticate);

router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/:id/complete", todoController.completeTodo);

export default router;
