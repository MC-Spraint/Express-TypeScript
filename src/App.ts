import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import http from 'http';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import mongoose,{Error} from 'mongoose';
import { Application } from 'express'
import { AuthRouter } from './apis/auth/AuthRouter';
import { HomeRouter } from './apis/HomeRouter';


export class App {
    protected app: Application;
    private server: any;
    private port: number;
    private frontendURI: string;
    private readonly DEFAULT_FRONTEND_URL: string = process.env.DEFAULT_FRONTEND_URL as string;
    private readonly DEFAULT_PORT: number = 3000;

    constructor(port: number, frontendURI?: string) {
        
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = this.DEFAULT_PORT|| port;
        this.frontendURI = frontendURI ?? this.DEFAULT_FRONTEND_URL;
        this.middlewares();
        this.initializeRoutes();
        this.database();
    }

    private middlewares(): void {
        //! Giving access to frontend 
        this.app.use(cors({credentials:true,origin:[this.DEFAULT_FRONTEND_URL as string]}));

        //! For extracting objects from json data in to req.body
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        //! For fetching files from frontend we make it a static directory
        this.app.use('/public',express.static(path.join('./public')));

        //^(connect-mongo + express-session) managing session
        this.app.use(session({
            secret: process.env.COOKIE_SECRET as string,
            resave: false,
            saveUninitialized: false,
            store: connectMongo.create({
                mongoUrl: process.env.MONGODB_URL as string
            }),
            cookie: { maxAge: 100*60*60*24}
        }))
    }

    private initializeRoutes() {
        this.app.use("/home", new HomeRouter().router);
        this.app.use("/auth", new AuthRouter().router);
    }

    public Application_Bootstrap(): void {
        //! Starting server
        this.server.listen(this.port,() =>{
            console.log(`✔ Express server running on port : ${this.port}\n${this.frontendURI} is allowed to be used your Front-End.`);
            console.log("Please wait while the server is being connected to the database....");
        })
    }


    private async database() :Promise<void> {
        let databaseURI: string=process.env.MONGODB_URL as string;
        mongoose.connect(databaseURI)
        .then(() => {
            console.log("✔ Database(MongoDB) connection has been established successfully!");
        })
        .catch((error:Error) => {
            console.log(error+"\n❌ Database connection failed..");
        })
    }

}

