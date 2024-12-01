import express from "express";
import {
  createClass,
  getAllClasses,
  updateClass,
  deleteClass,
} from "../controllers/classController";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import authenticateUser from "../middlewares/authMiddleware";
import { enrollInClass } from "../controllers/traineeController";

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
router.patch(
  "/enroll/:id",
  authenticateUser,
  roleMiddleware(["trainee"]),
  enrollInClass
);
router.put("/:id", authenticateUser, roleMiddleware(["admin"]), updateClass);
router.delete("/:id", authenticateUser, roleMiddleware(["admin"]), deleteClass);

export default router;
