import { Request, Response, NextFunction } from "express";

export interface IHomeController{
    getUsers(req: Request, res: Response, next: NextFunction): Promise<any>;
    addUsers(req: Request, res: Response, next: NextFunction): Promise<any>;
    
}