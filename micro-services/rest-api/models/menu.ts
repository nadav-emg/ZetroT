const mongoose = require('mongoose');

const uri: string = 'mongodb+srv://admin:admin@rest-3sqfi.mongodb.net/test?retryWrites=true&w=majority' //'mongodb://127.0.0.1:27017/local'
const mongo = mongoose;
mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true}, (err: any)=> {
    if (err){
        console.log(err.message);
    } else {
        console.log("Successfully connected");
    }
})

export const MenuItemSchema = new mongoose.Schema({
    name: {type:String , required: true},
    price: {type:Number , required: true},
    rest: { type: mongoose.Schema.ObjectId, ref: 'Rest' }
})
export interface IMenuItem{
    id: string,
    name: string ,
    price: number,
    rest: string
}

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
export default MenuItem;