import API from '../config/configs'
const Mock = require('mockjs');
//模拟数据测试
Mock.mock(API.baseURL +'/test','get',{
    msg:'成功',
    code:200,
    data:{
        'name|3':'fei',
        'age|20-30':25,
    }
});
export default Mock
