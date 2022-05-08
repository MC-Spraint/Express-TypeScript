import express, { Request, Response, NextFunction } from 'express';
import { AuthController } from '../auth/AuthController';

//!This class will be used as a reference
export class AuthRouter {
    public router = express.Router({strict: true});

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): void {
        let handler:AuthController = new AuthController();
        this.router.post('/register', (req: Request, res: Response, next: NextFunction)=> {return handler.register(req, res, next)});
        this.router.get('/verify', (req: Request, res: Response, next: NextFunction)=> {return handler.verify(req, res, next)});
    }
}
