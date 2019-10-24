import { Router } from 'express';
import { injectable } from 'inversify';
import { UsersController } from "../controllers/users.controller";
import {check} from 'express-validator'
@injectable()
export class UsersRoutes {

    router: Router;

    constructor(private usersController: UsersController) {
        this.router = Router();
        this.init();
    }

    init() {
        //TODO check validations
        this.router.route('/api/users',[
            check('name','Name is Required').not().isEmpty(),
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Please enter pass with 6 or more chars').isLength({min: 6})
        ])
            .post(this.usersController.RegisterUser)



    }
}