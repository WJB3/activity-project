'use strict';

const Controller = require('../controller/base');
const random = require('random')

class UserController extends Controller {
  async getList() {
    const user = await this.ctx.service.users.getUser();
    this.success(user);
    return user;
  }

  async create() {
    const { ctx } = this;
    const { username, password, phone, email } = ctx.request.body
    if (!username) {
      this.fail("用户名必传");
      return;
    }
    if (!password) {
      this.fail("密码必传必传")
      return;
    }
    if (!phone) {
      this.fail("手机号必传")
      return;
    }
    const allUsers = await this.getList();
    const user = allUsers.find(item => item.phone === phone);
    if (user) {
      this.fail("该手机号已存在")
      return;
    }
    const result = await this.app.mysql.insert('users', {
      username: username,
      password: password,
      phone: phone,
      email: email,
      status: "1"
    })
    console.log("result", result)
    this.success("创建用户成功!")
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
    console.log("get")
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

  async sendCode() {
    //1. 获取用户手机号
    const { phone } = this.ctx.request.body;
    if (!phone) {
      this.fail('手机号必填!');
      return;
    }
    //2. 缓存中查询该手机号是否存在
    const sendCodePhone = await this.service.cache.get(`sendCode_${phone}`);
    if (sendCodePhone) {
      this.fail('您操作的太快了，验证码还未过期!');
      return;
    }
    //3.生成随机四位验证码
    const randomCode = random.int(1000, 9999);

    console.log("randomCode", randomCode)

    // 调试环境 不请求阿里服务器
    if (!this.app.config.aliSMS.isopen) {
      await this._devCode(phone, randomCode);
    }

    //4. 请求阿里云API发送验证码
    const ret = await this.ctx.service.alisms.sendSMS(phone, randomCode);

    if (ret.Code === "OK") {
      // 5.发送成功写入redis缓存 60 秒过期
      this.ctx.service.cache.set(`sendCode_${phone}`, randomCode, this.app.config.aliSMS.expire);
      // 6.写入消息队列

      this.success('发送验证码成功!');
    }

  }

  //模拟发送短信验证码
  async _devCode(phone, randomCode) {
    this.ctx.service.cache.set(`sendCode_${phone}`, randomCode, this.app.config.aliSMS.expire);
    this.success('请求验证码成功!')
    return;
  }

  async current() { 
    const { userInfo } = await this.ctx.service.users.getCurrent();
    this.success(userInfo);
  }
}

module.exports = UserController;