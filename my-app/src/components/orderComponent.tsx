import React, {Component} from 'react'
import  {IMenu} from "../servies/menuService";
import orderService, {IOrder} from "../servies/orderService";
interface OrderComponentProps{
    menu?: IMenu
}
export class OrderComponent extends Component <OrderComponentProps, { list: IMenu[] }>{

    constructor (props: OrderComponentProps ) {
        super(props)
        this.state = {
            list: []
        }


    }

    componentWillReceiveProps(nextProps: Readonly<OrderComponentProps>, nextContext: any): void {
        const { menu } = nextProps

        if (menu) {
            this.addToOrderClick(menu)
        }
    }

    async addToOrderClick(menu:IMenu) {
        const newlist = this.state.list;
        newlist.push(menu)
        this.setState({
            list: newlist
        })
    }

    order(): void {
        const {list} = this.state;
        if (list.length>0){
            const order: IOrder = {rest: list[0].rest, menu_items: list.map(x=> x.id),name: '', delivery_address:''};
            orderService.addNewOrder(order)
        }
        this.setState({list:[]});
        this.render();

    }

    render() {
        const { menu  }=this.props;
        const { list } = this.state
        const style = {
            width: 600, height: 100,
            border: '3px solid black',
        };
        if (!menu) {
            return <div></div>
        }

        return (
            <div style={style}>
                <div>Order list</div>
                { list.map((r:IMenu,i:number) =>
                    <span key={i} >{r.name  }, </span>

                )}
                <button onClick={this.order.bind(this)}>Order</button>
            </div>
        );
    }
}
