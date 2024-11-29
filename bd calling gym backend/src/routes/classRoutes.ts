import { Router } from "express";
import { createClass, bookClass, getAllClasses, getClassById, updateClass, deleteClass } from "../controllers/classController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware(["admin"]), createClass);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "trainer"]),
  getAllClasses
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "trainer"]),
  getClassById
);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateClass);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteClass);
router.post("/book", authMiddleware, bookClass);

export default router;
