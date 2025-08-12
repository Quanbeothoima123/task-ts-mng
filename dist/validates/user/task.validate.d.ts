import { Request, Response, NextFunction } from "express";
export declare const validateCreateTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const validateEditTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
