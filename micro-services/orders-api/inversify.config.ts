import { Container } from "inversify";
import {OrdersController} from "./controllers/orders.controller";
import {OrdersService} from "./services/orders.service";
import {OrdersRoutes} from "./routes/orders.routes";


export class ContainerConfig {
    static  instance: ContainerConfig = new ContainerConfig();
    static  container: Container;
    static getContainer() {
        return ContainerConfig.container;
    }
    private constructor() {
        ContainerConfig.container = new Container({ defaultScope: 'Singleton' });
        //Routes
        ContainerConfig.container.bind<OrdersRoutes>(OrdersRoutes).toSelf();

        //Controllers
        ContainerConfig.container.bind<OrdersController>(OrdersController).toSelf();

        //Services
        ContainerConfig.container.bind<OrdersService>(OrdersService).toSelf();

    }
}