'use strict';

const Controller = require('../controller/base');

class AuthController extends Controller {
    async login() {
        const { username,password } = this.ctx.request.body
        if(!password){
            this.fail('密码必填!');
            return ;
        }
        const result = await this.app.mysql.get('users', { username });
        const resultAdmin = await this.app.mysql.get('admin', { username });
        if(!result && !resultAdmin){
            this.fail('用户不存在!');
            return ;
        }
        if(resultAdmin){
            if(resultAdmin.password!==password){
                this.fail('账号密码输入错误!');
                return ;
            }
        }  
        if(result){
            if(result.password!==password){
                this.fail('账号密码输入错误!');
                return ;
            }
        }
        // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
        // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
        const token = this.app.jwt.sign({
            username: username,
            password: password
        }, this.app.config.jwt.secret);

        let isAdmin;
        //普通会员登陆
        if(result){
            this.ctx.service.cache.set(token,result.id);
        }

        if(resultAdmin){
            isAdmin=true;
            this.ctx.service.cache.set(token,`admin_${resultAdmin.id}`);
        } 

        this.success({token,isAdmin})
    }
}

module.exports = AuthController;