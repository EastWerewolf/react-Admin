import {Component} from'react'
import {get,post,put,del} from './axios'
import {cookie,deepCopy} from './utils'
/**
 * 扩展React Component
 * 将公共方法挂载在构造函数里
 * 用于替代React.Component
 * 也可以使用修饰符的方式扩展挂载全局方法
 */
class ComponentPlus extends Component{
    constructor(){
        super()
        this.axios={get,post,put,del};
        this.utils = {cookie,deepCopy};
    }
}

/**
 * 这个是注入方式挂载axios
 * 用法: @axios(type) 修饰符ES7
 * @param type{string}
 * @returns {Function}
 */
function axios(type){
    return function(target){
        const axios = {get,post,put,del};
        if(!type){
            target.prototype.axios = axios
        }else{
            target.prototype[type] = axios[type]?axios[type]:error(type)
        }
    }
}

/**
 * 同样的方式注入工具类函数
 * 用法:@utils(type)
 * @param methodName{string}
 * @returns {Function}
 */
function utils(methodName){
    return function (target) {
        const utils = {cookie,deepCopy}
        if(!methodName){
            target.prototype.utils = utils
        }else{
            target.prototype[methodName] = utils[methodName]?utils[methodName]:error(methodName)
        }
    }
}

/**
 * 错误处理
 * @param errorName
 */
function error(errorName){
    throw new Error(`${errorName} is not a function,please check again`)
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

export  {ComponentPlus,log,axios,utils}