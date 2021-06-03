'use strict';

const Service = require('egg').Service;
let activity_allow_status = ['0','1'];
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
      where:{...search,status:activity_allow_status}
    });
    const result = await this.app.mysql.select('activity',{
      query,
      where:{...search,status:activity_allow_status}
    }); 
    return {
      total:total.length,
      data:result
    };
     
  }

}

module.exports = ActivityService; 