import express from "express";
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
  enrollInClass,
} from "../controllers/classController";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import authenticateUser from "../middlewares/authMiddleware";

const router = express.Router();

// Routes
router.post("/", authenticateUser, roleMiddleware(["admin"]), createClass);
router.get(
  "/",
  authenticateUser,
  roleMiddleware(["admin", "trainer"]),
  getAllClasses
);
// Route to enroll in a class
router.patch("/:classId/enroll", enrollInClass);
router.put("/:id", authenticateUser, roleMiddleware(["admin"]), updateClass);
router.delete("/:id", authenticateUser, roleMiddleware(["admin"]), deleteClass);

export default router;
