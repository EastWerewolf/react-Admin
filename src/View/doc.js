import React,{Component}from 'react'
import {axios,log,utils} from '../Config/componentPlus'

@axios('get')
@axios('post')
@utils('deepCopy')
class Doc extends Component{

    componentDidMount(){
        this.get('/test').then((res)=>{
            console.log(res)
        });
        this.post('/param').then(res=>{
            console.log(res)
        },err=>{
            console.log(err)
        })
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
