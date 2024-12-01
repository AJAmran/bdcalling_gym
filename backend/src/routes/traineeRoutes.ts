import express from "express";

import { roleMiddleware } from "../middlewares/roleMiddleware";
import authenticateUser from "../middlewares/authMiddleware";
import { enrollInClass } from "../controllers/traineeController";

const router = express.Router();

router.patch(
  "/enroll/:id",
  authenticateUser,
  roleMiddleware(["trainee"]),
  enrollInClass
);
