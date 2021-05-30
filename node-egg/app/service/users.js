'use strict';

const Service = require('egg').Service;

class UserService extends Service { 
   

  //查询用户，如果不传参数默认所有用户
  async getUser(){ 
    const { pageSize,pageNum } = this.ctx.request.query;

    const query = {
      offset: Number(pageNum) * Number(pageSize) - Number(pageSize),
      limit: Number(pageSize)
    };
    const total=await this.app.mysql.select('users');
    const result = await this.app.mysql.select('users',query); 
    return {
      total:total.length,
      data:result
    };
  }

  async getCurrentUserId(){ 
    const token=this.ctx.get('Authorization').replace('Bearer ',"");  
    const currentUserId = await this.ctx.service.cache.get(token);
    return currentUserId;
  }

  async getCurrent(){ 
    const userId=await this.getCurrentUserId();
    let result;
    let isadmin=false;
    //是管理员
    if(String(userId).indexOf('admin_')>-1){
      result = await this.app.mysql.select('admin',{id:userId}); 
      isadmin=true;
    }else{
      result = await this.app.mysql.select('users',{id:userId}); 
    }
    return {
      isadmin,
      userInfo:result,
      userId:result[0].id
    };
  }


}

module.exports = UserService; 