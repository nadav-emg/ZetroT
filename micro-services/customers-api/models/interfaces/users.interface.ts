import mongoose = require("mongoose");

export interface IUserModel extends mongoose.Document {
    name: string;
    password: string;
    _id: string;
}
