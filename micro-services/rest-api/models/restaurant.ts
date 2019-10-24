const mongoose = require('mongoose');

const uri: string = 'mongodb+srv://admin:admin@rest-3sqfi.mongodb.net/test?retryWrites=true&w=majority' ;//'mongodb://127.0.0.1:27017/local'
//const mongo = mongoose;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any)=> {
    if (err){
        console.log(err.message);
    } else {
        console.log("Successfully connected");
    }
})

export const RestSchema = new mongoose.Schema({
    name: {type:String , required: true, unique: true},
    address: {type:String , required: true},
    phone: {type:String , required: true},
    delivery_hours: [
        {
           hours: {
               start: {type: String},
               end: {type: String}
           }
        }
    ],
    menu: [
        {
            menu_item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'menuitem'
            }
        }
    ]
})

export interface IRest {
    name: string,
    address: string,
    phone: string,
    _id: string,
    delivery_hours: [
        {
            start: string,
            end: string

    }],


    }

const Rest = mongoose.model('Rest', RestSchema);
export default Rest;