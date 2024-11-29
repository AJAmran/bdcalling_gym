import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;
