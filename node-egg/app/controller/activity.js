'use strict';

const Controller = require('../controller/base');

class UserController extends Controller {

  async getList() { 
    const user = await this.ctx.service.activity.getActivity(); 
    this.success(user);
    return user;
  }

  async create() {
    const { ctx } = this;
    const { title, title_img } = ctx.request.body
    if (!title) {
      this.fail("活动标题必传");
      return;
    }
    if (!title_img) {
      this.fail("活动图片必传")
      return;
    } 
    const token=ctx.get('Authorization').replace('Bearer ',""); 

    console.log("token",token)

    const userId=await this.ctx.service.users.getCurrentUserId(token)
 
    if(!userId){
        this.fail("您的账号已失效，请重新登陆!");
        return ;
    }
    
    const result = await this.app.mysql.insert('activity', { 
        title,
        title_img,
        userId
    })
    console.log("result", result)
    this.success("创建活动成功!")
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      this.fail("参数缺失！")
      return;
    }
    const result = await this.app.mysql.get('users', { id });
    if (!result) {
      this.fail("该用户不存在！")
      return;
    }
    await this.app.mysql.delete('users', {
      id
    });
    this.success("删除成功")
  }

  async get() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      this.fail("参数缺失！")
      return;
    }
    const result = await this.app.mysql.get('users', { id });
    if (!result) {
      this.fail("该用户不存在！")
      return;
    }
    this.success(result);
    return result;
  }

  async edit() {
    const { ctx } = this;
    const { id } = ctx.request.body
    if (!id) {
      this.fail("参数缺失！")
      return;
    }
    const result = await this.app.mysql.update('users', {
      id, 
      ...ctx.request.body
    });
    if (result) {
      this.success('修改成功！')
    }

  }
}

module.exports = UserController;