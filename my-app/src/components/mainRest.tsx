import React, {Component} from 'react'
import {MenuComponent} from "./MenuComponent";
import {RestSearch} from "./RestSearch";
import {IRest} from "../servies/restService";
import {OrderComponent} from "./orderComponent";


export class  MainRest extends Component < {},{selectedRest?: IRest}>{

    constructor (props: {}) {
        super(props)
        this.state = {
            selectedRest: undefined

        }
    }

    setSelectedRest( rest: IRest){
        debugger;
        console.log('Rest', rest);
        this.setState({selectedRest:rest})

    }


    render() {

        const { selectedRest } = this.state

        return (
            <div >
                <RestSearch onRestClick={this.setSelectedRest.bind(this)} />
                < MenuComponent isVisible={!!selectedRest} rest={selectedRest}/>

            </div>
        );
    }
}
