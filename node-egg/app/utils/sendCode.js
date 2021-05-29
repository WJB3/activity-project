const Core = require('@alicloud/pop-core');

var client = new Core({
    accessKeyId: 'LTAI5tJAwGiyjMuexj9haTev',
    accessKeySecret: 'wazk7OWXHv4u8mfEptjgBTjna6xfQQ',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});

var params = {
    "PhoneNumbers": "15397363675",
    "SignName": "阿里大于测试专用",
    "TemplateCode": "SMS_209335004",
    "TemplateParam": "{\"code\":\"1111\"}"
}

var requestOption = {
    method: 'POST'
};

client.request('SendSms', params, requestOption).then((result) => {
    console.log(JSON.stringify(result));
}, (ex) => {
    console.log(ex);
})