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
        if(!result){
            this.fail('用户不存在!');
            return ;
        }
        if(result.password!==password){
            this.fail('账号密码输入错误!');
            return ;
        }
        // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
        // 特别注意：token不能直接发送，要在前面加上Bearer字符串和一个空格
        const token = this.app.jwt.sign({
            username: username,
            password: password
        }, this.app.config.jwt.secret);

        this.ctx.service.cache.set(token,result.id);

        this.success({token})
    }
}

module.exports = AuthController;