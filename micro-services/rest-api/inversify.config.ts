import { Container } from "inversify";
import {RestController } from "./controllers/rest.controller"
import {RestRoutes } from "./routes/rest.routes";
import {RestService} from "./services/rest.service";
import {MenuItemService} from "./services/menu-item.service";
import {MenuItemController} from "./controllers/menu.controller";
import {MenuRoutes} from "./routes/menu.route";

export class ContainerConfig {
    static  instance: ContainerConfig = new ContainerConfig();
    static  container: Container;
    static getContainer() {
        return ContainerConfig.container;
    }
    private constructor() {
        ContainerConfig.container = new Container({ defaultScope: 'Singleton' });
        //Services
        ContainerConfig.container.bind<MenuItemService>(MenuItemService).toSelf();
        ContainerConfig.container.bind<RestService>(RestService).toSelf();

        //Routes
        ContainerConfig.container.bind<RestRoutes>(RestRoutes).toSelf();
        ContainerConfig.container.bind<MenuRoutes>(MenuRoutes).toSelf();

        // Controllers
        ContainerConfig.container.bind<RestController>(RestController).toSelf();
        ContainerConfig.container.bind<MenuItemController>(MenuItemController).toSelf();

    }
}