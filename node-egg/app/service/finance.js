'use strict';

const Service = require('egg').Service;

class FinanceService extends Service {

  //查询用户，如果不传参数默认所有用户
  async getFinance() {
    const { activityId } = this.ctx.request.query; 
    let result;
    if(!activityId){
      result = await this.app.mysql.select('highlights')
    }else{
      result = await this.app.mysql.select('highlights', {
        where: { activityId }
      });
    }
 
    return result;
  }

 

  async create(params) {
    console.log("finance create",params)
    const { year,total,liabilityratio,operatingactivities,operatingincome,netprofit } = params
    if (!year) { 
      return "财务情况必传";
    }
    if (!total) { 
      return "总资产必传";
    }  
    if(!liabilityratio){
      return "总资产资产负债率必传";
    }
    if(!operatingactivities){
      return "经营活动净现金流必传";
    }
    if(!operatingincome){
      return "营业收入必传";
    }
    if(!netprofit){
      return "净利润必传";
    }
  }

}

module.exports = FinanceService;