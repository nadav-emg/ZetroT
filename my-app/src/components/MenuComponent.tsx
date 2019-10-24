import React, {ChangeEvent, Component, FormEvent} from 'react'
import Modal from 'react-modal'

//import restService, {IRest} from "../servies/restService";
import menuService, {IMenu} from "../servies/menuService";
import restService, {IRest} from "../servies/restService";
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
    startRef?: React.RefObject<HTMLInputElement>
    endRef?: React.RefObject<HTMLInputElement>
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
        this.startRef = React.createRef()
        this.endRef = React.createRef()


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
        const style = {
            width: 600,
            border: '3px solid black',
        };
        const { list, newMenu, isVisible, selectedOrder } = this.state

        if (!isVisible) {
            return <div></div>
        }
        const {delivery_hours}= this.props.rest!
        return (

            <div style={style}>

                <div onClick={()=> this.onAddMenuClick()}>
                    + New Item
                </div>
                <div>
                    { delivery_hours.map((d:{start:string,end:string},index:number) =>

                            <div key={index}>

                                <label>start:</label><span>{d.start} - </span>
                                <label>end:</label><span> {d.end}</span>
                                <label onClick={()=> this.removeDeivery(index)} >- click to remove -</label>
                            </div>

                        )}
                        <div >
                            <label>start:</label><input type={"text"} ref={this.startRef}/>
                            <label>end:</label><input type={"text"} ref={this.endRef}/>
                            <span onClick={()=> this.addDeivery()}>+ add new delivery frame</span>
                        </div>

                </div>

                <div>Click to add to order</div>
                { list.map((r:IMenu,index:number) =>

                    <div key={index} onClick={() => this.addToOrder.bind(this, r)()}>

                        <span>{r.name} - </span>
                        <span> {r.price}</span>

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

    private editDeliveryHours() {
        const {rest} = this.props;

    }

    private removeDeivery(index: number) {
        const {rest} = this.props
        if (rest) {
            rest.delivery_hours.splice(index, 1);
            restService.updateRest(rest);
        }

    }

    private addDeivery() {
        debugger
        const {rest} = this.props
        if (rest&&this.startRef!.current&&this.endRef!.current) {
            rest.delivery_hours.push({start:this.startRef!.current!.value,end:this.endRef!.current!.value})
            restService.updateRest(rest);
        }

    }
}
