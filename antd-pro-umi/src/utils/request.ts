/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { notification } from 'antd';

/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({

});

request.interceptors.request.use(async (url, options) => {
  if (
    options.method === 'post' ||
    options.method === 'put' ||
    options.method === 'delete' ||
    options.method === 'get'
  ) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization':`Bearer ${sessionStorage.getItem('TOKEN')}`
    };
    return {
      url,
      options: { ...options, headers },
    };
  }
});

// 克隆响应对象做解析处理
request.interceptors.response.use(async response => {
  const data = await response.clone().json(); 
  if (data && data.code !== 200) {
    notification.error({
      description: '服务器内部错误',
      message: data.msg,
    });
    return Promise.reject()
  }
  return Promise.resolve(data.data)
});




export default request;
