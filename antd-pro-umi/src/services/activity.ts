import request from '@/utils/request';
import { requestPrefix } from './config';
import qs from 'qs'; 

export async function add(data:any) {
  return request(`${requestPrefix}/activity`, {
    method: 'POST',
    data:data
  });
}
