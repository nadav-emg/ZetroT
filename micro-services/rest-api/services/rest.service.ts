import {id, injectable} from 'inversify';
import { Request, Response } from 'express';
import Rest, {IRest} from "../models/restaurant";
import {IMenuItem} from "../models/menu";

@injectable()
export class RestService {
     async getAllRests(){
        let rests = await Rest.find();
        return rests;
    }
    async getRest( id:string){
        let rest = await Rest.findById(id);
        return rest;
    }

    async addRest( rest: IRest){
        let new_rest = new Rest(rest);
        new_rest.save();
    }

    async updateRest( rest: IRest){

        let update_rest = await this.getRest(rest._id);
        while (update_rest.delivery_hours.length) { update_rest.delivery_hours.pop(); }

        update_rest.delivery_hours.push(rest.delivery_hours);
        update_rest.save();


    }
    async updateRestMenue( rest: IRest, menu: IMenuItem){

            let update_rest = await this.getRest(rest._id);
            update_rest.menu.push(menu.id);
            update_rest.save();


    }
}