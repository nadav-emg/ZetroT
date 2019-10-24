import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import IBaseController = require("./interfaces/base/BaseController");
import UserBusiness = require("../Business/UserBusiness");
import {IUserModel} from "../models/interfaces/users.interface";



@injectable()
export class UsersController  implements IBaseController <UserBusiness>{


    RegisterUser = async (req: Request, res: Response) => {

        try{
            let user: IUserModel = <IUserModel>req.body;
            const userBusiness = new UserBusiness();

            userBusiness.create(user, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
            //let user = User.findOne ({email});
            if (user){
                res.status(400).json({errors: [{msg: 'User already exist'}]});
            }


        } catch (e) {
            console.error(e.message);
            res.status(500)
        }
        res.send(req.body);
        return  res.status(200).send();
    }
    update(req: Request, res: Response): void {
        try {
            var hero: IUserModel = <IUserModel>req.body;
            var _id: string = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.update(_id, hero, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    delete(req: Request, res: Response): void {
        try {

            var _id: string = req.params._id;
            var heroBusiness = new UserBusiness();
            heroBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    retrieve(req: Request, res: Response): void {
        try {

            var heroBusiness = new UserBusiness();
            heroBusiness.retrieve((error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    findById(req: Request, res: Response): void {
        try {

            var _id: string = req.params._id;
            var heroBusiness = new UserBusiness();
            heroBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    create(req: Request, res: Response): void {
        try {

            var hero: IUserModel = <IUserModel>req.body;
            var userBusiness = new UserBusiness();
            userBusiness.create(hero, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }



}