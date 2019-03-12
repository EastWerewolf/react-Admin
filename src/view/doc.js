import React,{Component}from 'react'
import {axios,log,utils} from '../config/componentPlus'

@axios('get')
@utils('deepCopy')
class Doc extends Component{
    @log
    add(){
       return 6
    }
    componentDidMount(){
        this.get('/eded',{param:111}).then((res)=>{
            console.log(res)
        })
        console.log(this.deepCopy)
    }
    render(){
        return(
            <div>文档</div>
        )
    }
}
export default Doc