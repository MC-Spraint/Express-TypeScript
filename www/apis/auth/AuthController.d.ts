import { Request, Response, NextFunction } from "express";
import { IAuthController } from '../../apis/auth/IAuthController';
export declare class AuthController implements IAuthController {
    constructor();
    random: number;
    host: string;
    protocol: string;
    user: any;
    register(req: Request, res: Response, next: NextFunction): Promise<any>;
    verify(req: Request, res: Response, next: NextFunction): Promise<any>;
}
