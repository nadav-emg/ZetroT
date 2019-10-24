import axios from 'axios'

export interface IRest {
    name: string,
    address: string,
    phone: string,
    _id: string,
    delivery_hours: [
        {
            start: string,
            end: string

        }]
    menu_ids: string[]


}
 class RestService {
    private axs= axios.create({
        baseURL: 'http://127.0.0.1:8090/rest/',
        timeout: 1000

        //headers: {'X-Custom-Header': 'foobar'}
    });

    async getAll ( name?: string): Promise<IRest[]> {
        const params = new URLSearchParams();
        /*if (name) {
            params.append('name', name);
        }*/

        const { data } = await this.axs.get<IRest[]>('');
        return data;

    }


     async updateRest ( rest: IRest): Promise<IRest> {

         /*if (name) {
             params.append('name', name);
         }*/

         const { data } = await this.axs.put<IRest>('update',rest);
         return data;

     }

 }

export default new RestService()