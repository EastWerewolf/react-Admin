/**
 * 扩展React Component
 * 将公共方法挂载在构造函数里
 * 用于替代React.Component
 */
import React,{Component} from'react'
import {get,post,put,del} from './axios'

class ComponentPlus extends Component{
    constructor(){
        super()
        this.axios={get,post,put,del}
        this.get = get;
        this.post = post;
        this.put = put;
        this.del = del;
    }
}
export default ComponentPlus