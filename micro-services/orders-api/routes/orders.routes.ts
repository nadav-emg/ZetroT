import { Router } from 'express';
import { injectable } from 'inversify';
import { OrdersController } from "../controllers/orders.controller";

@injectable()
export class OrdersRoutes {

    router: Router;

    constructor(private ordersController: OrdersController) {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.route('/order')
            .put(this.ordersController.addOrder);

    }
}