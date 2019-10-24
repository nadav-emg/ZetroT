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

    async updateRestMenue( rest: IRest, menu: IMenuItem){

            let update_rest = await this.getRest(rest.id);
            update_rest.menu.push(menu.id);
            update_rest.save();


    }
}