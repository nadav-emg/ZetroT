import axios from 'axios'

export interface IMenu{
    id: string,
    name: string ,
    price: string,
    rest: string
}
class MenuService {
    private axs= axios.create({
        baseURL: 'http://127.0.0.1:8090/menu/',
        timeout: 1000

        //headers: {'X-Custom-Header': 'foobar'}
    });

    async getAll ( name?: string): Promise<IMenu[]> {
        const params = new URLSearchParams();
        /*if (name) {
            params.append('name', name);
        }*/

        const { data } = await this.axs.get<IMenu[]>('');
        return data;

    }

    async addNewMenu(newMenu: IMenu) {
        debugger
        const { data } = await this.axs.put<IMenu>('',newMenu);
        return data;
    }
}

export default new MenuService()