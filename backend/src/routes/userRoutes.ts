import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../controllers/userController";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import authenticateUser from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateUser, roleMiddleware(["admin"]), getAllUsers);
router.get("/:id", authenticateUser, roleMiddleware(["admin"]), getUserById);
router.put("/:id", authenticateUser, updateUser);
router.patch(
  "/update-role",
  authenticateUser,
  roleMiddleware(["admin"]),
  updateUserRole
);
router.delete("/:id", authenticateUser, roleMiddleware(["admin"]), deleteUser);

export default router;
