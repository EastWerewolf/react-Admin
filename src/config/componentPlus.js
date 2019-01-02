/**
 * 扩展React Component
 * 将公共方法挂载在构造函数里
 * 用于替代React.Component
 * 也可以使用修饰符的方式扩展挂载全局方法
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

/**
 * 这个是注入方式挂载axios
 * @param type{string}
 * @returns {Function}
 */
function axios(type){
    return function(target){
        const axios = {get,post,put,del};
        if(!type){
            target.prototype.axios = axios
        }else{
            target.prototype[type] = axios[type]
        }
    }
}

/**
 * 日志输出
 * @param target 被修饰的目标Class
 * @param name 被修饰的属性名
 * @param descriptor 属性的描述对象{Configurable,Enumerable,Writable,Value}
 * @returns {*}
 */
function log(target, name, descriptor) {
    let oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    };

    return descriptor;
}

export  {ComponentPlus,log,axios}