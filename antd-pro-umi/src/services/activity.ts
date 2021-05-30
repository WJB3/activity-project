import request from '@/utils/request';
import { requestPrefix } from './config';
import qs from 'qs'; 

export async function add(data:any) {
  return request(`${requestPrefix}/activity`, {
    method: 'POST',
    data:data
  });
}

export async function getList(params:any) {
  return request(`${requestPrefix}/activity/list?${qs.stringify(params)}`, {
    method: 'GET'
  });
}

export async function deleteItem(id:string|number) {
  return request(`${requestPrefix}/activity/${id}`, {
    method: 'DELETE'
  });
}