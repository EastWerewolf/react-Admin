import axios from 'axios'
import urlConfigs from './configs'
import {message as Msg} from 'antd'

//axios全局配置
let instance = axios.create({
    baseURL:urlConfigs.baseURL,
    crossDomain: true
});
console.log(urlConfigs.baseURL)
//请求拦截器
instance.interceptors.request.use((config)=>{
    if ((config.method === 'post' || config.method === 'put' || config.method === 'get' || config.method === 'delete')) {
        // 序列化
        config.headers['Content-Type'] = 'application/json;'
    }
    return config
});
//响应拦截器
instance.interceptors.response.use((response)=>{
    let {code,data,message} = response.data;
    if(code===416||code===417){
        let href = window.location.href;
        console.log(href)
    }else if(code===200){
        return Promise.resolve(response.data)
    }else{
        Msg.error(message||'请求失败');
        return Promise.reject({
            msg: message || '请求失败',
            data: data || null,
            code
        })
    }
},(error)=>{
    Msg.error('网络异常，请重试'||error.response.data.message)
    console.log(error,'请求失败')
});

const get = (url,params)=>{
    return new Promise((resolve, reject) => {
        instance.get(url, {params}).then(res => {
            resolve(res.data)
        },res=>{
            reject(res)
        }).catch(err=>{
            console.log(err)
        })
    })
};
const post = (url,params)=>{
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => {
            resolve(res.data)
        },res=>{
            reject(res)
        }).catch(err=>{
            console.log(err)
        })
    })
};
const put = (url,params)=>{
    return new Promise((resolve, reject) => {
        instance.put(url, params).then(res => {
            resolve(res.data)
        },res=>{
            reject(res)
        }).catch(err=>{
            console.log(err)
        })
    })
};
const del = (url)=>{
    return new Promise((resolve, reject) => {
        instance.delete(url).then(res => {
            resolve(res.data)
        },res=>{
            reject(res)
        }).catch(err=>{
            console.log(err)
        })
    })
};
export {get,post,put,del}
