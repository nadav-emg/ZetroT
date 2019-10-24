import { Router } from 'express';
import { injectable } from 'inversify';
import { RestController} from "../controllers/rest.controller";

@injectable()
export class RestRoutes {

    router: Router;

    constructor(private restController: RestController) {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.route('/rest')
            .put(this.restController.AddNewRest);
        this.router.route('/rest')
            .get(this.restController.allRest);
        this.router.route('/rest/:id')
            .get(this.restController.getRest);

    }
}