import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Class from "../models/classModel";


// Create a new class
export const createClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, time, trainer, trainees } = req.body;

    // Check if the trainer exists and has the "trainer" role
    const trainerExists = await User.findById(trainer);
    if (!trainerExists || trainerExists.role !== "trainer") {
      return res.status(400).json({ success: false, message: "Invalid trainer ID." });
    }

    // Check if max 5 classes already exist for the day
    const classCount = await Class.countDocuments({ date });
    if (classCount >= 5) {
      return res.status(400).json({
        success: false,
        message: "Cannot create more than 5 classes for the day.",
      });
    }

    // Create the class
    const newClass = await Class.create({ date, time, trainer, trainees: trainees || [] });

    res.status(201).json({ success: true, message: "Class created successfully.", data: newClass });
  } catch (error) {
    next(error);
  }
};

// Fetch all classes
export const getAllClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classes = await Class.find().populate("trainer trainees");
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
};

// Fetch a single class by ID
export const getClassById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = req.params.id;
    const singleClass = await Class.findById(classId).populate("trainer trainees");
    if (!singleClass) {
      return res.status(404).json({ success: false, message: "Class not found." });
    }
    res.status(200).json({ success: true, data: singleClass });
  } catch (error) {
    next(error);
  }
};

// Update a class
export const updateClass = async (req: Request, res: Response, next: NextFunction) => {
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
      return res.status(404).json({ success: false, message: "Class not found." });
    }

    res.status(200).json({ success: true, message: "Class updated successfully.", data: updatedClass });
  } catch (error) {
    next(error);
  }
};

// Delete a class
export const deleteClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = req.params.id;

    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).json({ success: false, message: "Class not found." });
    }

    res.status(200).json({ success: true, message: "Class deleted successfully." });
  } catch (error) {
    next(error);
  }
};
