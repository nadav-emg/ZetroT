import { injectable } from 'inversify';
import { Request, Response } from 'express';
import {RestService} from "../services/rest.service";

@injectable()
export class RestController {

    constructor(private restService: RestService) {
    }

    allRest = async (req: Request, res: Response) => {
        try {
            let rests = await this.restService.getAllRests();
            res.status(200).send(rests);
        } catch (err) {
            console.log(err.message)
            res.status(500).send(err.message);
        }
    }



    getRest = async (req: Request, res: Response) => {
        try {
            const rest = await this.restService.getRest(req.params.id);
            res.status(200).send(rest);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
    updateRest = async (req: Request, res: Response) => {
        //let rest = new Rest(req.body)
        try {
            const id= req.query.id
            await this.restService.updateRest(req.body);
            res.status(200).send();
        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }

    }

    AddNewRest = async (req: Request, res: Response) => {
        //let rest = new Rest(req.body)
        try {
            await this.restService.addRest(req.body);
            res.status(200).send();
        } catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }

    }

}