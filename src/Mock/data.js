import API from '../Config/configs'
import {channel,DIVERGING_COLOR_SCALE,sale,payList} from './analysis'
const Mock = require('mockjs');
const URL = API.baseURL;


//模拟数据测试
Mock.mock(URL +'/test' , 'get',{
    msg:'成功',
    code:200,
    data:{
        'name|3':'fei',
        'age|20-30':25,
    }
});
Mock.mock(URL+'/channel','post',{
    msg:'成功',
    code:200,
    data:{
        channel,
        DIVERGING_COLOR_SCALE
    }
});
Mock.mock(URL+'/sale','post',{
    msg:'成功',
    code:200,
    data:{
        sale,
        payList
    }
})
export default Mock
