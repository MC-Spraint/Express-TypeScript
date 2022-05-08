import { Request, Response, NextFunction } from 'express';
import { IHomeController } from './IHomeController';
import { UsersModel } from '../models/users/UsersModel';
import { Users } from '../models/users/Users';

export class HomeController implements IHomeController{
    constructor(){}
    public async getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        let perPage: number = 2;
        if(req.query.name!==undefined && req.query.name!==null){
            try{
            let regex: any = new RegExp(String(req.query.name), 'i');
            let total: number = await UsersModel.count({name: regex});
            let pages: number = Math.ceil(total / perPage);
            let pageNumber: number = (req.query.page === undefined) ? 1 : Number(req.query.page);
            let startFrom: number = (pageNumber - 1) * perPage;
            
            let usersPerPage: Users[] = await UsersModel.find({name: regex})
            .sort({ "age": req.query.sort==="dec" ? -1: 1 })
            .skip(startFrom)
            .limit(perPage);

            let resObj = {curUsers:usersPerPage, queries:"'page': number, 'name': string, 'sort': 'dec' for descending order", curPage:pageNumber, totalPages:pages, totalUsers:total}

            return res.status(200).json({status:"200",message:"Ok",data:resObj});
            }catch(err){
            return res.status(500).json({status:"500",message:"Internal server error", data:null});
            }
        }else{
            try{
            let total: number = await UsersModel.count();
            let pages: number = Math.ceil(total / perPage);
            let pageNumber: number = (req.query.page === undefined) ? 1 : Number(req.query.page);
            let startFrom: number = (pageNumber - 1) * perPage;
            
            let usersPerPage: Users[] = await UsersModel.find({})
            .sort({ "age": req.query.sort==="dec" ? -1: 1 })
            .skip(startFrom)
            .limit(perPage);
            let resObj = {curUsers:usersPerPage, queries:"'page': number, 'name': string, 'sort': 'dec' for descending order", curPage:pageNumber, totalPages:pages, totalUsers:total}

            return res.status(200).json({status:"200",message:"Ok",data:resObj});
            }catch(err){
            return res.status(500).json({status:"500",message:"Internal server error", data:null});
            }
        }
    }

    public async addUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        
        return res.status(200).json({status:"406",message:"API is under construction",data:null});
    }

}