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
export {cookie}