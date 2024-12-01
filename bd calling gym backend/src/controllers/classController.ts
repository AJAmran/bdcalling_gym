import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Class from "../models/classModel";
import { Types } from "mongoose";

// Create a new class
export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, time, trainer } = req.body;

    const trainerExists = await User.findById(trainer);
    if (!trainerExists || trainerExists.role !== "trainer") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid trainer ID" });
    }

    const existingClasses = await Class.countDocuments({ date });
    if (existingClasses >= 5) {
      return res.status(400).json({
        success: false,
        message: "Cannot schedule more than 5 classes per day",
      });
    }

    const newClass = await Class.create({
      date,
      time,
      trainer,
      trainees: [],
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch all classes
export const getAllClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classes = await Class.find()
      .populate("trainer", "fullName email")
      .populate("trainees", "fullName email");
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
};

// Cancel Enrollment
export const cancelEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure req.user is defined
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { classId } = req.params;

    const gymClass = await Class.findById(classId);
    if (!gymClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    // Convert req.user.id to ObjectId for Mongoose
    const userId = new Types.ObjectId(req.user.id);

    if (!gymClass.trainees.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this class",
      });
    }

    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId },
      { $pull: { trainees: userId } },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Enrollment canceled successfully",
      data: updatedClass,
    });
  } catch (error) {
    next(error);
  }
};

// Update a class
export const updateClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classId = req.params.id;
    const { date, time, trainer, trainees } = req.body;

    // Update the class
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { date, time, trainer, trainees },
      { new: true }
    );

    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found." });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully.",
      data: updatedClass,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a class
export const deleteClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classId = req.params.id;

    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully." });
  } catch (error) {
    next(error);
  }
};
