import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { HomeController } from './HomeController';


export class HomeRouter {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(): void {
        let handler:HomeController = new HomeController();
        this.router.get('/get_users', (req: Request, res: Response, next: NextFunction)=> {return handler.getUsers(req, res, next)});
        this.router.post('/add_users', (req: Request, res: Response, next: NextFunction)=> {return handler.addUsers(req, res, next)});

    }

    
}

