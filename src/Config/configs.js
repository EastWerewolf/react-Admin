/**
 * 不同环境下的API,通过打包命令区分环境
 * @type {string}
 */
const env = process.env.NODE_ENV;
const urlConfigs = {
    development:{
        baseURL:'https://neta_dev.themobiyun.com'
    },
    test:{
        baseURL:'https://netatest.themobiyun.com'
    },
    uat:{
        baseURL:'https://customer-api-pre.chehezhi.cn'
    },
    production:{
        baseURL:'https://customer-api.chehezhi.cn'
    }
};
export default urlConfigs[env];
