/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "admin" | "trainer" | "trainee";
        name?: string;
        email?: string;
        [key: string]: any;
      };
    }
  }
}
