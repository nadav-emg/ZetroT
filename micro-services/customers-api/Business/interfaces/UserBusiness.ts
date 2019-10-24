
import BaseBusiness = require("./base/BaseBusiness");
import {IUserModel} from "../../models/interfaces/users.interface";


interface IUserBusiness extends BaseBusiness<IUserModel> {

}
export = IUserBusiness;