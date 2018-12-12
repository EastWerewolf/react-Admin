const env = process.env.NODE_ENV;
const urlConfigs = {
    development:{
        baseURI:'https://neta_dev.themobiyun.com'
    },
    test:{
        baseURI:'https://netatest.themobiyun.com'
    },
    uat:{
        baseURI:'https://customer-api-pre.chehezhi.cn'
    },
    production:{
        baseURI:'https://customer-api.chehezhi.cn'
    }
};
export default urlConfigs[env];
