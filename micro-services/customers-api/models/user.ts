import {IUserModel} from "./interfaces/users.interface";


export class UserModel {
    private _userModel: IUserModel;
    constructor(userModel: IUserModel){
        this._userModel=userModel;
    }

    get name (): string {
        return this._userModel.name;
    }
    get password (): string {
        return this._userModel.password;
    }
    get _id (): string {
        return this._userModel._id;
    }
}