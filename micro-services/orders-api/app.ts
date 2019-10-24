import 'reflect-metadata';
import { ContainerConfig } from './inversify.config';
//import * as express from 'express';
import * as http from 'http';

import {OrdersRoutes} from "./routes/orders.routes";

var express = require('express');

export class App {
    public express;
    private server: http.Server ;
    //private config: IConnectionConfig;
    public static bootstrap(): App {
        const container = ContainerConfig.getContainer();
        return new App(container.get(OrdersRoutes));
    }

    constructor(private restRoutes:OrdersRoutes) {

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
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');

            next();
        });
    }
    private initRoutes(): void {
        const router = express.Router();
        this.express.use('/', this.restRoutes.router);


    }

    private initServer() {
        return this.server = http.createServer(this.express);
    }

    private listen() {
        const port =  8098; //TODO add config
        this.server.listen(port, () => {
            console.log(`orders-api running on port: ${port}`);
        });
    }
}