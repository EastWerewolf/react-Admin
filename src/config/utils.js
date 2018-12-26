/**
 * 工具类函数
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
}

/**
 * 对象深度复制
 * @param obj
 * @param uniqueType
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
                newObj[prop] = deepCopy(obj[prop]);//递归
            } else {
                newObj[prop] = obj[prop];
            }
        }
    }
    return newObj;
}
export {cookie,deepCopy}