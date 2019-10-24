import DataAccess = require("./../../dataAccess/DataAccess");
import {IUserModel} from "../../models/interfaces/users.interface";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            _id: {
                type: String,
                required: true,
                unique: true,

            },
            password: {
                type: String,
                required: true
            }
        });

        return schema;
    }

}
var schema = mongooseConnection.model<IUserModel>("Users", UserSchema.schema);
export = schema;