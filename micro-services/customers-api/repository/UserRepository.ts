
import RepositoryBase = require("./base/RepositoryBase");
import {IUserModel} from "../models/interfaces/users.interface";
import UserSchema = require("./../dataAccess/schemas/UserSchema");
class UserRepository  extends RepositoryBase<IUserModel> {
    constructor () {
        super( UserSchema );
    }
    findOne (email: string, callback: (error: any, result: IUserModel) => void) {
        this._model.findOne(email,callback);
    }
}

Object.seal(UserRepository);
export = UserRepository;