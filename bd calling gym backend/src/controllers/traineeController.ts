import { Request, Response, NextFunction } from "express";
import Class from "../models/classModel";
import { Types } from "mongoose";// Enroll in Class


export const enrollInClass = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      const classId = req.params.id;
  
      // Find the class by ID
      const gymClass = await Class.findById(classId);
      if (!gymClass) {
        return res
          .status(404)
          .json({ success: false, message: "Class not found" });
      }
  
      if (gymClass.trainees.length >= gymClass.maxTrainees) {
        return res.status(400).json({ success: false, message: "Class is full" });
      }
  
      const userId = new Types.ObjectId(req.user.id);
  
      if (gymClass.trainees.includes(userId)) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in this class",
        });
      }
  
      // Update the class to add the user
      const updatedClass = await Class.findOneAndUpdate(
        { _id: classId },
        { $push: { trainees: userId } },
        { new: true }
      );
  
      if (!updatedClass) {
        return res
          .status(404)
          .json({ success: false, message: "Failed to enroll in class" });
      }
  
      res.status(200).json({
        success: true,
        message: "Enrolled successfully",
        data: updatedClass,
      });
    } catch (error) {
      next(error);
    }
  };