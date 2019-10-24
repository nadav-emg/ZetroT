import { injectable} from 'inversify';
import Order ,{IOrder} from "../models/order";


@injectable()
export class OrdersService {
    async getAllOrders(){
        let orders = await Order.find();
        return orders;
    }
    async getOrder( id:string){
        let order = await Order.findById(id);
        return order;
    }

    async addOrder( order: IOrder){
        let new_order = new Order(order);
        new_order.save();
        return new_order;
    }


}