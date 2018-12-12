import axios from 'axios'
import React from 'react'
import urlConfigs from './configs'
import {message as Msg} from 'antd'
import { Redirect } from 'react-router-dom';
let instance = axios.create({
    baseURl:urlConfigs.baseURI,
    crossDomain: true
});
// 请求拦截器
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
        return <Redirect to='/login'/>
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
});

const get = (url,params)=>{
    return new Promise((resolve, reject) => {
        instance.get(url, {params}).then(res => {
            resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    })
};
const post = (url,params)=>{
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => {
            resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    })
};
const put = (url,params)=>{
    return new Promise((resolve, reject) => {
        instance.put(url, params).then(res => {
            resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    })
};
const del = (url)=>{
    return new Promise((resolve, reject) => {
        instance.delete(url).then(res => {
            resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    })
};
export {get,post,put,del}
