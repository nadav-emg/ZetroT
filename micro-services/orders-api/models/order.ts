const mongoose = require('mongoose');

const uri: string = 'mongodb+srv://admin:admin@rest-3sqfi.mongodb.net/test?retryWrites=true&w=majority' //'mongodb://127.0.0.1:27017/local'

mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true}, (err: any)=> {
    if (err){
        console.log(err.message);
    } else {
        console.log("Successfully connected");
    }
})

export const OrderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    delivery_address: {type: String, required: true},
    rest: {type: mongoose.Schema.ObjectId, ref: 'Rest'},
    menu_items: [
        {
            menu_item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'menuitem'
            }
        }
    ]
})
export interface IOrder{
    name: string
    delivery_address: string
    rest: string
    menu_items: string[]

}

const Order = mongoose.model('Order', OrderSchema);
export default Order;