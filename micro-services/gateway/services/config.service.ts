import { injectable } from 'inversify';
import * as config from 'config';
import {ConfigurationTypes} from "../models/enums/configuration-types.enum";

@injectable()
export class ConfigService {
    constructor(){}
    conf= config;
    get<T>(key: ConfigurationTypes): T {
        try {

            if (this.conf.config.has(key)) {
                const hbconf = this.conf.config.get(key);
                return hbconf;
            }

            else {
                console.log('Error');
            }

        } catch (err) {
            throw new err

        }
    }
}