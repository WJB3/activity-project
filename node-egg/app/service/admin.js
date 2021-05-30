'use strict';

const Service = require('egg').Service;

class AdminService extends Service { 
 
  //查询用户，如果不传参数默认所有用户
  async getAdmin(){ 
    const result = await this.app.mysql.select('admin'); 
    return result;
  }
  
}

module.exports = AdminService; 