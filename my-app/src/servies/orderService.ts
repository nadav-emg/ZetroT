import axios from 'axios'

export interface IOrder{
    name: string
    delivery_address: string
    rest: string
    menu_items: string[]

}
class OrderService {
    private axs= axios.create({
        baseURL: 'http://127.0.0.1:8098/order/',
        timeout: 1000

        //headers: {'X-Custom-Header': 'foobar'}
    });

    async getAll ( name?: string): Promise<IOrder[]> {
        const params = new URLSearchParams();
        /*if (name) {
            params.append('name', name);
        }*/

        const { data } = await this.axs.get<IOrder[]>('');
        return data;

    }

    async addNewOrder(newOrder: IOrder) {
        debugger
        const { data } = await this.axs.put<IOrder>('',newOrder);
        return data;
    }
}

export default new OrderService()