import React, {Component} from 'react'
import restService, {IRest} from "../servies/restService";
interface RestSearchComponentProps{
    //rest: IRest[]
    onRestClick: (rest: IRest)=> void
}
export class RestSearch extends Component <RestSearchComponentProps, { list: IRest[] }>{
    restRef?: React.RefObject<HTMLInputElement>

    constructor (props: RestSearchComponentProps ) {
        super(props)
        this.state = {
            list: []
        }

        this.restRef = React.createRef()
    }

    async onRestSearchClick() {
        debugger
        const { value } = this.restRef!.current!
        const res = await restService.getAll(value)

        this.setState({
            list: res
        })
    }

    render() {
        const style = {
            width: 600, height: 100,
            border: '3px solid black',
        };
        const { onRestClick }=this.props;
        const { list } = this.state

        return (
            <div style={style}>
            <input type={"text"} ref={this.restRef}/>
            <button onClick={this.onRestSearchClick.bind(this)}>Search</button>

            { list.map((r:IRest,i:number) =>
                <div key={i} onClick={()=> onRestClick(r)}>{r.name }</div>

            )}
            </div>
        );
    }
}
