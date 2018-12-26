import React from 'react'
import Component from '../config/componentPlus'

class Doc extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        console.log(this.get,this.axios)
        this.get('/eded',{param:111}).then((res)=>{
            console.log(res)
        })
    }
    render(){
        return(
            <div>文档</div>
        )
    }
}
export default Doc