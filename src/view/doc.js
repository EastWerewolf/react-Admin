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
        this.get('/eded',{param:111}).then((res)=>{
            console.log(res)
        })
        console.log( window.location.href.split(':'))
    }
    render(){
        return(
            <div>文档</div>
        )
    }
}
export default Doc