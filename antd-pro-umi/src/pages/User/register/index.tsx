import { 
    LockOutlined,  
    UserOutlined
  } from '@ant-design/icons';
  import {  Button, message } from 'antd';
  import React, { useEffect } from 'react';
  import ProForm, { ProFormText } from '@ant-design/pro-form';
  import { useIntl, connect, FormattedMessage,history } from 'umi'; 
  import type { Dispatch } from 'umi';
  import type { StateType } from '@/models/login';
  import type { LoginParamsType } from '@/services/login';
  import type { ConnectState } from '@/models/connect'; 

  import { register } from '@/services/user'
  
  import styles from './index.less';
  
  export type LoginProps = {
    dispatch: Dispatch;
    userLogin: StateType;
    submitting?: boolean;
  };
  
   
  
  const Login: React.FC<LoginProps> = (props) => {
    const { submitting } = props;  
    const intl = useIntl();
  
    const handleSubmit = (values: LoginParamsType) => {
       console.log("handleSubmit",values)
       if(values.password!==values.password2){
         message.error("2次输入的密码必须一致!");
         return ;
       }
       register({
        username:values.username,
        password:values.password
       }).then(res=>{
         console.log("register",res)
         message.success("用户注册成功，正在跳转登陆页")
         history.replace({
          pathname: '/user/login', 
        })
       })
      
    };

    const handleReturnLogin=()=>{
      history.replace({
        pathname: '/user/login', 
      })
    }
   
    return (
      <div className={styles.main}>
        <ProForm
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: submitting,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            handleSubmit(values as LoginParamsType);
            return Promise.resolve();
          }}
          className={styles.form}
        > 
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder', 
              defaultMessage: 'Username: admin or user',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="Please enter user name!"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: 'Password: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="Please enter password！"
                  />
                ),
              },
            ]}
          /> 
          <ProFormText.Password
            name="password2"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={"请再次输入密码"}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="Please enter password！"
                  />
                ),
              },
            ]}
          /> 
        </ProForm> 
        <Button type="default" block style={{marginTop:20}} onClick={handleReturnLogin}>
          返回登陆页
        </Button>
      </div>
    );
  };
  
  export default connect(({ login, loading }: ConnectState) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
  }))(Login);
  