import { Request, Response, NextFunction } from "express";

export interface IAuthController{
    register(req: Request, res: Response, next: NextFunction): Promise<any>;
    verify(req: Request, res: Response, next: NextFunction): Promise<any>;
}