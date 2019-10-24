import { injectable } from 'inversify';
import MenuItem, {IMenuItem} from "../models/menu";




@injectable()
export class MenuItemService {
    allMenuItems = async () => {
        let Items = MenuItem.find();
        return Items;
    }
    getMenuItem= async (id:string) => {
        let Items = MenuItem.findById(id);
        return Items;
    }
    addNewMenuItem = async ( menuItem : IMenuItem) => {
        let newItem=new MenuItem(menuItem);
        newItem.save();
        return newItem;
    }

}