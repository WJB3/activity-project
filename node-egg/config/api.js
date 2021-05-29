'use strict';
/**
 * 阿里短信发送流程
 * 1. 到控制台 / 短信服务 / 国内消息 添加一个签名
 */
module.exports={
    /** 阿里大鱼短信验证码配置 */
    aliSMS:{
        isopen:true,//是否开启短信发送
        expire:60,//短信验证码有效期
        accessKeyId:'LTAI5tJAwGiyjMuexj9haTev',
        accessSecret:'wazk7OWXHv4u8mfEptjgBTjna6xfQQ',
        regionId:'',
        product:'',
        version:'',
        SignName:'',
        TemplateCode:''
    }
}