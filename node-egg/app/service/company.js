'use strict';

const Service = require('egg').Service;

class CompanyService extends Service {

  //查询用户，如果不传参数默认所有用户
  async getCompany() {
    const { activityId } = this.ctx.request.query; 
    let result;
    if(!activityId){
      result = await this.app.mysql.select('company')
    }else{
      result = await this.app.mysql.select('company', {
        where: { activityId }
      });
    }
 
    return result;
  }

 

  async create(params) {
    console.log("company create",params)
    const { activityId, name, whereadress, stockcode, registeradress, ratingagencies, latestrating, historyrating } = params
    if (!activityId) { 
      return "活动ID必传";
    }
    if (!name) { 
      return "活动名称必传";
    }
    if (!whereadress) { 
      return "上市地点必传";
    }
    if (!stockcode) { 
      return "股票代码必传";
    }
    if (!registeradress) { 
      return "注册地址必传";
    }
    if (!ratingagencies) { 
      return "评级机构必传";
    }
    if (!latestrating) { 
      return "最新评级必传";
    }
    if (!historyrating) { 
      return "历史评级必传";
    }
    // const result = 
    //this.success("创建公司成功!")
  }

}

module.exports = CompanyService;