/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
