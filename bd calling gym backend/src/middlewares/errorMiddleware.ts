import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
};
