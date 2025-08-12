import { Request, Response, NextFunction } from "express";
import { UserDocument } from "../types/express";
declare module "express" {
    interface Request {
        user?: UserDocument | null;
    }
}
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
