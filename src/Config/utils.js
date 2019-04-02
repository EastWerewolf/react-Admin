/**
 * 工具类函数 Cookie的操作
 * @type {{set: cookie.set, get: function(*): any, delete: cookie.delete}}
 */

const cookie={
    set: function (name, value, days) {
        //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        if(days!== 0&&days){
            let expires = days * 24 * 60 * 60 * 1000;
            let date = new Date(+new Date()+expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
        }else{
            document.cookie = name + "=" + escape(value);
        }
        return cookie
    },
    get: function (name) {
        let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    del: function (name) {
        this.set(name, '', -1);
        return cookie

    }
};

/**
 * 对象深度复制
 * @param obj{object}
 * @param uniqueType{boolean}?
 * @returns {*}
 */
function deepCopy(obj,uniqueType){
    let newObj = obj.constructor === Array ? []:{};
    newObj.constructor = obj.constructor;
    if(typeof obj !== "object"){
        return ;
    } else if(!uniqueType){
        newObj = JSON.parse(JSON.stringify(obj));//若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
    } else {
        for(let prop in obj){
            if(obj[prop].constructor === RegExp ||obj[prop].constructor === Date){
                newObj[prop] = obj[prop];
            } else if(typeof obj[prop] === 'object'){
                newObj[prop] = deepCopy(obj[prop],true);//递归
            } else {
                newObj[prop] = obj[prop];
            }
        }
    }
    return newObj;
}

/**
 * 拍平数组
 * @param array
 * @returns {Array}
 */
function flat(array){
    let flatArr = [];
    (function getFlat(childArr){
        let arr = childArr?childArr:array;
        arr.forEach(i=>{
            if(typeof(i)==='object'&&typeof i.length === 'number'){
                getFlat(i)
            }else{
                flatArr.push(i)
            }
        })
    }());
    return flatArr
}
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
/**
 * @desc 函数节流
 * @param {*} func
 * @param {*} wait
 */
function throttle(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
export {cookie,deepCopy,debounce,throttle,flat}
