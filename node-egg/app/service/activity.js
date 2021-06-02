'use strict';

const Service = require('egg').Service;

class ActivityService extends Service {  

  //查询用户，如果不传参数默认所有用户
  async getActivity(){ 
    const { userId,isadmin }=await this.ctx.service.users.getCurrent() 
    const { pageSize,pageNum } = this.ctx.request.query;

    let search={};
    if(!isadmin){
      search.userId=userId;
    }

    const query = {
      offset: Number(pageNum) * Number(pageSize) - Number(pageSize),
      limit: Number(pageSize), 
    };
    const total=await this.app.mysql.select('activity',{
      where:{...search}
    });
    const result = await this.app.mysql.select('activity',{
      query,
      where:{...search}
    }); 
    return {
      total:total.length,
      data:result
    };
     
  }

}

module.exports = ActivityService; 