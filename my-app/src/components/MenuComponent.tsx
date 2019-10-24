import React, {ChangeEvent, Component, FormEvent} from 'react'
import Modal from 'react-modal'

//import restService, {IRest} from "../servies/restService";
import menuService, {IMenu} from "../servies/menuService";
import {IRest} from "../servies/restService";
import {OrderComponent} from "./orderComponent";



interface MenuComponentProps{
    rest?: IRest
    isVisible: boolean
}
interface MenuComponentState{
    list: IMenu[],
    modalIsOpen: boolean,
    newMenu: IMenu
    isVisible: boolean
    selectedOrder?: IMenu
}
Modal.setAppElement('#root')

export class MenuComponent extends Component <MenuComponentProps, MenuComponentState>{

    constructor (props: MenuComponentProps) {
        super(props)
        this.state = {
            isVisible: false,
            list: [],
            modalIsOpen: false,
            newMenu: {
                name: '',
                price: '',
                rest: '',
                id:''

            }
        }


        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    async componentWillReceiveProps(nextProps: Readonly<MenuComponentProps>, nextContext: any): Promise<void> {
        debugger

        const items=await menuService.getAll();//TODO get all menues for rest
        this.setState({list: items});
        const { newMenu } = this.state;
        newMenu.rest= (nextProps.rest ? nextProps.rest._id  : '')
        const { isVisible } = nextProps;
        debugger
        this.setState({newMenu, isVisible})
    }


    openModal() {
        this.setState({
            modalIsOpen: true
        });

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false,
            newMenu: {rest: '', price: '', id: '', name: ''}});
    }


    addNewMenu(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        menuService.addNewMenu(this.state.newMenu);
    }
    updateNewMenu(field: keyof IMenu, event: ChangeEvent<HTMLInputElement> ){
        const {newMenu} = this.state;

        newMenu[field] = event.target.value;
        this.setState({newMenu})
    }

    addToOrder(menu: IMenu) {
        this.setState({selectedOrder: menu})
    }

    render() {

        const { list, newMenu, isVisible, selectedOrder } = this.state

        if (!isVisible) {
            return <div></div>
        }

        return (
            <div>

                <div onClick={()=> this.onAddMenuClick()}>
                    + add new menu
                </div>
                { list.map((r:IMenu,index:number) =>

                    <div key={index} onClick={() => this.addToOrder.bind(this, r)()}>

                        <span>{r.name}</span>

                    </div>

                )}

                <OrderComponent menu={selectedOrder}  />

            <Modal

                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal">
                    <h2 >New Menu Item</h2>
                <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                <form onSubmit={this.addNewMenu.bind(this)}>
                    <label>Name</label>
                    <input type="text" value={newMenu.name} onChange={this.updateNewMenu.bind(this, 'name')}/>

                    <label>Price</label>
                    <input type="text" value={newMenu.price} onChange={this.updateNewMenu.bind(this, 'price')}/>

                    <input type="submit" value="Save"/>
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
        </Modal>

            </div>
        );
    }

    private onAddMenuClick() {
        this.openModal();
    }
}
