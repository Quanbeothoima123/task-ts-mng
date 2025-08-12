import { Request, Response } from "express";
export declare const index: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const detail: (req: Request, res: Response) => Promise<void>;
export declare const changeStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const changeMulti: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const create: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const edit: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
