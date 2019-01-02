import React,{Component}from 'react'
import {ComponentPlus,axios,log} from '../config/componentPlus'

@axios('get')
class Doc extends Component{
    constructor(){
        super()
    }
    @log
    add(){
       return 6
    }
    componentDidMount(){
        console.log(this.get)
        this.get('/eded',{param:111}).then((res)=>{
            console.log(res)
        })
        this.add(11)
    }
    render(){
        return(
            <div>文档</div>
        )
    }
}
export default Doc