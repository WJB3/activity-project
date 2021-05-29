'use strict';

const Service = require('egg').Service;

class UserService extends Service { 
  //查询user表 验证密码和花名
  async vaildUser(username){
    const data = await this.getUser({username});
  }

  //查询用户，如果不传参数默认所有用户
  async getUser(){ 
    const result = await this.app.mysql.select('users'); 
    return result;
  }

  async getCurrentUserId(){ 
    const token=this.ctx.get('Authorization').replace('Bearer ',"");  
    const currentUserId = await this.ctx.service.cache.get(token);
    return currentUserId;
  }



}

module.exports = UserService; 