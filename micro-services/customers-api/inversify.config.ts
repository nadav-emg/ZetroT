import { Container } from "inversify";
import { UsersRoutes } from "./routes/user.routes";
import {UsersController } from "./controllers/users.controller";

export class ContainerConfig {
    static  instance: ContainerConfig = new ContainerConfig();
    static  container: Container;
    static getContainer() {
        return ContainerConfig.container;
    }
    private constructor() {
        ContainerConfig.container = new Container({ defaultScope: 'Singleton' });
        // Controllers
        ContainerConfig.container.bind<UsersController>(UsersController).toSelf();
        ContainerConfig.container.bind<UsersRoutes>(UsersRoutes).toSelf();


    }
}