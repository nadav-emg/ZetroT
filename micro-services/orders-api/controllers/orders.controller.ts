import { injectable } from 'inversify';
import { Request, Response } from 'express';
import {OrdersService} from "../services/orders.service";
import Order, {IOrder} from "../models/order";

@injectable()
export class OrdersController {

    constructor(private orderService: OrdersService) {
    }

    getAllOrders= async (req: Request, res: Response)=> {
        try {
            const items = await this.orderService.getAllOrders();
            res.status(200).send(items);
        } catch (e) {
            console.log(e.message);
            res.status(500).send(e.message);
        }

    }

     addOrder = async (req: Request, res: Response)=> {
        try {
            const order: IOrder = req.body;
            //payment issue (out of scope?) - delivery status??? (new\made\in delivery\delivered)
            const newOrder= await this.orderService.addOrder(order);
            res.status(200).send(newOrder);
        } catch (e) {
            console.log(e.message);
            res.status(500).send(e.message);
        }

    }

}