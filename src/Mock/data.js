import API from '../Config/configs'
const Mock = require('mockjs');
const URL = API.baseURL;

//模拟数据测试
Mock.mock(URL +'/test','get',{
    msg:'成功',
    code:200,
    data:{
        'name|3':'fei',
        'age|20-30':25,
    }
});
export default Mock
