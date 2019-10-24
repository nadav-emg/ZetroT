import { Router } from 'express';
import { injectable } from 'inversify';
import { MenuItemController } from "../controllers/menu.controller";

@injectable()
export class MenuRoutes {

    router: Router;

    constructor(private menuItemController: MenuItemController) {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.route('/menu')
            .put(this.menuItemController.addNewMenuItem);
        this.router.route('/menu')
            .get(this.menuItemController.getAllMenuItems);
        this.router.route('/menu/:id')
            .get(this.menuItemController.getMenuItem);

    }
}