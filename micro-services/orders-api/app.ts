import 'reflect-metadata';
import { ContainerConfig } from './inversify.config';
//import * as express from 'express';
import * as http from 'http';

import {RestRoutes} from "./routes/rest.routes";
import {MenuRoutes} from "./routes/menu.route";
var express = require('express');

export class App {
    public express;
    private server: http.Server ;
    //private config: IConnectionConfig;
    public static bootstrap(): App {
        const container = ContainerConfig.getContainer();
        return new App( container.get( RestRoutes ),container.get(MenuRoutes));
    }

    constructor(private restRoutes: RestRoutes, private menuRoutes: MenuRoutes) {

        this.initExpress();
        this.middleware()
        this.initRoutes();

        this.initServer();
        this.listen();
    }

    private initExpress(): void {
        this.express = express();
    }
    private middleware(): void {
        this.express.use(express.json())
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            next();
        });
    }
    private initRoutes(): void {
        const router = express.Router();

        this.express.use('/', this.restRoutes.router);
        this.express.use('/', this.menuRoutes.router);

    }

    private initServer() {
        return this.server = http.createServer(this.express);
    }

    private listen() {
        const port =  8090; //TODO add config
        this.server.listen(port, () => {
            console.log(`rest-api running on port: ${port}`);
        });
    }
}