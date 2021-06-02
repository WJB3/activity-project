import request from '@/utils/request';
import { requestPrefix } from './config';
import qs from 'qs';

//注册接口
export async function register(data:any) {
  return request(`${requestPrefix}/user`, {
    method: 'POST', 
    data:data
  });
}


export async function current() {
  return request(`${requestPrefix}/user/current`, {
    method: 'GET', 
  });
}

export async function getList(params:any) {
  return request(`${requestPrefix}/user/list?${qs.stringify(params)}`, {
    method: 'GET'
  });
}
