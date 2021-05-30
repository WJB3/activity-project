import request from '@/utils/request';
import { requestPrefix } from './config';
import qs from 'qs';

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
