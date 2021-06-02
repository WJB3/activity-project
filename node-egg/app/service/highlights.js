'use strict';

const Service = require('egg').Service;

class HighlightService extends Service {

  //查询用户，如果不传参数默认所有用户
  async getHighlights() {
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
    console.log("highlights create",params)
    const { title,content } = params
    if (!title) { 
      return "亮点标题必传";
    }
    if (!content) { 
      return "亮点内容必传";
    }  
  }
 

}

module.exports = HighlightService;