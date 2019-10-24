import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { ContainerConfig } from './inversify.config';
//import * as express from 'express';
import * as http from 'http';
import { UsersRoutes } from "./routes/user.routes";


var express = require('express');

export class App {
    public express;
    private server: http.Server ;
    //private config: IConnectionConfig;
    public static bootstrap(): App {
        const container = ContainerConfig.getContainer();
        return new App( container.get( UsersRoutes ));
    }

    constructor(private restRoutes: UsersRoutes) {

        this.initExpress();
        this.middleware();
        this.initRoutes();

        this.initServer();
        this.listen();
    }

    private initExpress(): void {
        this.express = express();
    }

    private initRoutes(): void {
        const router = express.Router();

        this.express.use('/', this.restRoutes.router);

    }

    private initServer() {
        return this.server = http.createServer(this.express);
    }
    private middleware(): void {
        this.express.use(express.json())
    }
    private listen() {
        const port =  8099; //TODO add config
        this.server.listen(port, () => {
            console.log(`rest-api running on port: ${port}`);
        });
    }
}