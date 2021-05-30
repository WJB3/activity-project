import request from '@/utils/request';
import { requestPrefix } from './config';

export type LoginParamsType = {
  username: string;
  password: string; 
};

//登陆接口
export async function login(params: LoginParamsType) {
  return request(`${requestPrefix}/login`, {
    method: 'POST',
    data: params,
  });
}

export async function adminList() {
  return request(`${requestPrefix}/admin/list`, {
    method: 'GET', 
  });
}

 