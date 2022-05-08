import { Request, Response, NextFunction } from "express";
import { UsersModel } from '../../models/users/UsersModel';
import { SmtpTransport } from '../../utils/SmtpTransport';
import { IAuthController } from '../../apis/auth/IAuthController';

export class AuthController implements IAuthController{
    constructor(){
        this.random=0;
        this.host="";
        this.protocol="";
        this.user={};
    }
    
    public random: number;
    public host: string;
    public protocol: string;
    public user: any;
    
    public async register(req :Request, res: Response, next: NextFunction): Promise<any> {
        if(req.body.email===""||req.body.email===null){
            console.log("Email is required");
            return res.status(406).json({status:"406",message:"Email is required",data:null});
        }
        else if(req.body.name===""||req.body.name===null){
            console.log("Name is required");
            return res.status(406).json({status:"406",message:"Name is required",data:null});
        }
        else if(req.body.password===""||req.body.password===null){
            console.log("Password is required");
            return res.status(406).json({status:"406",message:"Password is required",data:null});
        }
        else{
            const userAlreadySaved = await UsersModel.findOne({email: req.body.email});
            //^Check if that perticular user exists in database or not
            if(!userAlreadySaved ) {
                this.random = Math.floor((Math.random()*100)+54);
                this.host = req.get('host') as string;
                this.protocol = req.protocol as string;

                let link:string;
                link = this.protocol+"://"+this.host+"/auth/verify?id="+this.random.toString();
                const mailOptions = {
                    from : "mcspraint954@gmail.com",                                                         
                    to : req.body.email,
                    subject : "Mc Spraint Wants To Verify You",
                    html : `<div style="text-align:center; color:green;">
                    <h3>Hello ${req.body.name},<br/>Welcome to my world <br/>
                    click the link given below to verify it's you<br/>
                    </h3>
                    <a href="${link}">click here to verify</a>
                    </div>`
                };
                SmtpTransport.sendMail(mailOptions, async (err:any,result:any) => {
                    if(err){
                        console.log(err);
                        return res.status(408).json({status:"408",message:"Request failed",data:err});
                        } 
                    else{
                        this.user = await new UsersModel(req.body);
                        console.log(result);
                        return res.status(200).json({status:"200",message:"A link has been sent to your email",data:result});
                        //!The sever'll crash with 464 so turn on less secure app on your google acc
                    }
                })
            }else{
                console.log("Email is already registered");
                return res.status(406).json({status:"406",message:"Email is already registered",data:null});
            }
        }
    }

    public async verify(req: Request, res: Response, next: NextFunction): Promise<any>{
        if( req.protocol+"://"+req.get('host') === this.protocol+"://"+this.host ){
            console.log("Domain is matched. Information is from Authentic email");
            if(req.query.id===this.random.toString()){
                try{
                    await this.user.save();
                    console.log("Email is verified successfully");
                    return res.redirect(process.env.FRONTEND_URL + "/auth/welcome");
                }
                catch(error){
                    res.status(401).json({status:"401",message:"This route recieved an undefined user",data:error});
                }
            }else{
                console.log("Email is not verified.");
                return res.status(400).json({status:"400",message:"Bad Request",data:null});
            }
        }else{
            console.log("Request is from unknown source");
            return res.status(403).json({status:"403",message:"Request is from unknown source",data:null});
        }
    }
}


