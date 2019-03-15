import React,{Component}from 'react'
import {axios,log,utils} from '../Config/componentPlus'

@axios('get')
@utils('deepCopy')
class Doc extends Component{

    componentDidMount(){
        this.get('/test').then((res)=>{
            console.log(res)
        });
        console.log(this.deepCopy)
    }
    @log
    render(){
        return(
            <div>文档</div>
        )
    }
}
export default Doc
