'use strict';

const Controller = require('../controller/base'); 

class AdminController extends Controller {
  async getList() { 
    const user = await this.ctx.service.admin.getAdmin(); 
    this.success(user);
    return user;
  }

  async create() {
    const { ctx } = this;
    const { username, password } = ctx.request.body
    if (!username) {
      this.fail("用户名必传");
      return;
    }
    if (!password) {
      this.fail("密码必传必传")
      return;
    } 
    
    const result = await this.app.mysql.insert('admin', {
      username: username,
      password: password
    })
    console.log("result", result)
    this.success("管理员用户成功!")
  }
 
}

module.exports = AdminController;