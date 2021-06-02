import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { login } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) { 
      try{
        const response = yield call(login, payload); 
        // Login successfully
        if (response) { 
          message.success('🎉 🎉 🎉  登录成功！');  
          sessionStorage.setItem('isLogin','true');
          sessionStorage.setItem('TOKEN',response.token);
          if(response.isAdmin){
            sessionStorage.setItem('IS_ADMIN','TRUE')
          } 
          window.location.href = '/'; 
        }
      }catch(e){
        console.error('e',e)
      } 
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      sessionStorage.clear(); 
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
