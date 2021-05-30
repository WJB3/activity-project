'use strict';

const Service = require('egg').Service;

class ActivityService extends Service {  

  //查询用户，如果不传参数默认所有用户
  async getActivity(){ 
   
    const { userId }=await this.ctx.service.users.getCurrent() 
    const result = await this.app.mysql.select('activity',{
      where: { userId }
    }); 
    return result;
  }

}

module.exports = ActivityService; 