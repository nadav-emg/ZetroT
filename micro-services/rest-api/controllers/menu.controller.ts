import { injectable } from 'inversify';
import { Request, Response } from 'express';
import {IMenuItem} from "../models/menu";
import Rest from "../models/restaurant";
import {MenuItemService} from "../services/menu-item.service";
import {RestService} from "../services/rest.service";



@injectable()
export class MenuItemController {

    constructor(private menuItemService: MenuItemService, private  restService:RestService){

    }
    getAllMenuItems = async(req: Request, res: Response) => {
        try {
            const items = await this.menuItemService.allMenuItems();
            res.status(200).send(items);
        } catch (e) {
            console.log(e.message);
            res.send(e.message);
        }

    }

    getMenuItem = async (req: Request, res: Response) => {
        try {
            const item = await this.menuItemService.getMenuItem(req.id);
            res.status(200).send(item);
        } catch (e) {
            console.log(e.message);
            res.send(e.message);
        }
    }
    addNewMenuItem = async (req: Request, res: Response) => {
        let item : IMenuItem = req.body;
        try{
            const newItem= await this.menuItemService.addNewMenuItem(item);
            const restToUpdate= await this.restService.getRest(newItem.rest);
            restToUpdate.menu.push(newItem._id);
            restToUpdate.save();
            res.status(200).send(newItem);

        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }

    }
    deleteRest = async (req: Request, res: Response) => {
        let rest = new Rest(req.body)
        try{
            rest.save()
        } catch (e) {
            console.log(e.message);
            res.status(400).send(rest);
        }

    }
}