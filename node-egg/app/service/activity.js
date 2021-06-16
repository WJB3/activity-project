'use strict';

const Service = require('egg').Service;
let activity_allow_status = ['0','1'];

let languageList=['all','cn','en']

let allow_status='1';
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

  async getActivityList(){  
    const { pageSize,pageNum,language } = this.ctx.request.query;

    if(pageSize>1000){
      return '超出最大长度'
    } 
 
    let search={};

    search.language=language || languageList;

    const query = {
      offset: Number(pageNum) * Number(pageSize) - Number(pageSize),
      limit: Number(pageSize), 
    };
    console.log("query",{...search})
    const total=await this.app.mysql.select('activity',{
      where:{...search,status:allow_status}
    });
    const result = await this.app.mysql.select('activity',{
      query,
      where:{...search,status:allow_status}
    }); 
    let returnResult=result.map(item=>({...item,financial_disclosure:JSON.parse(item.financial_disclosure),highlights:JSON.parse(item.highlights)   }));
    return {
      total:total.length,
      data:returnResult
    };
     
  }

}

module.exports = ActivityService; 