import { Request, Response, NextFunction } from 'express';
import { IHomeController } from './IHomeController';
export declare class HomeController implements IHomeController {
    constructor();
    getUsers(req: Request, res: Response, next: NextFunction): Promise<any>;
    addUsers(req: Request, res: Response, next: NextFunction): Promise<any>;
}
