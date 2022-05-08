import { Application } from 'express';
export declare class App {
    protected app: Application;
    private server;
    private port;
    private frontendURI;
    private readonly DEFAULT_FRONTEND_URL;
    private readonly DEFAULT_PORT;
    constructor(port: number, frontendURI?: string);
    private middlewares;
    private initializeRoutes;
    Application_Bootstrap(): void;
    private database;
}
