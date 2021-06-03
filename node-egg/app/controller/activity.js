'use strict';

const Controller = require('../controller/base');

//创建时status为0 表示未审核 1 表示已审核 -1表示已删除
class ActivityController extends Controller {

  async getList() {
    const user = await this.ctx.service.activity.getActivity();
    this.success(user);
    return user;
  }

  async create() {
    const { ctx } = this;
    const { title, title_img, highlights=[],financial_disclosure=[],sector,formstatus,content,company_logo,fundingTarget,underwrite,website,slogan,banner,overview,language,type } = ctx.request.body;
    const allActivitys = await this.getList();
    const activity = allActivitys.data.find(item => item.title === title);
    if (activity) {
      this.fail("无法创建重复的活动")
      return;
    }
    if (!title) {
      this.fail("活动标题必传");
      return;
    }
    if (!title_img) {
      this.fail("活动图片必传")
      return;
    }
    if (!sector) {
      this.fail("活动部门必传")
      return;
    }
    if(!formstatus){
      this.fail("募集状态必传")
      return;
    } 
    if(financial_disclosure && !financial_disclosure.length){
      this.fail("资金信息必传")
      return;
    }
    const { userId } = await this.ctx.service.users.getCurrent()

    if (!userId) {
      this.fail("您的账号已失效，请重新登陆!");
      return;
    }
 
    const result = await this.app.mysql.insert('activity', {
      title,
      title_img,
      status:0,
      sector,
      userId,
      formstatus,
      content,
      slogan,
      fundingTarget,
      banner,
      overview,
      underwrite,
      website,
      company_logo,
      language,
      type
    })
    
    try {
      highlights.forEach(async ({key,...company}) => {
        const err = await this.ctx.service.highlights.create({ ...company, activityId: result.insertId });
        console.log("err", err);
        if (err) {  
          this.fail(err);
          return ;
        }else{
          await this.app.mysql.insert('highlights', { ...company, activityId: result.insertId })
        }
      })
    } catch (e) {
      console.log("catch", e.message)  
      return;
    } 

    try {
      financial_disclosure.forEach(async ({key,...company}) => {
        const err = await this.ctx.service.finance.create({ ...company, activityId: result.insertId });
        console.log("err", err);
        if (err) {  
          this.fail(err);
          return ;
        }else{
          await this.app.mysql.insert('finance', { ...company, activityId: result.insertId })
        } 
      })
    } catch (e) {
      console.log("catch", e.message)  
      return;
    } 

    this.success("创建活动成功!")
  }

  async audit(){
    const { ctx } = this;
    const { id } = ctx.request.body;
    if(!id){
      this.fail("唯一标识必传")
      return;
    }
    await this.app.mysql.update('activity', {
      id,
      status:"1"
    })
    this.success("审核活动成功!")
  }

  async edit() {
    const { ctx } = this;
    const { id,title, title_img, highlights=[],financial_disclosure=[],sector,formstatus,content,company_logo,fundingTarget,underwrite,website,slogan,banner,overview,language,type } = ctx.request.body;
 
    if(!id){
      this.fail("唯一标识必传")
      return;
    }
    
    if (!title) {
      this.fail("活动标题必传");
      return;
    }
    if (!title_img) {
      this.fail("活动图片必传")
      return;
    }
    if (!sector) {
      this.fail("活动部门必传")
      return;
    }
    if(!formstatus){
      this.fail("募集状态必传")
      return;
    } 
    if(financial_disclosure && !financial_disclosure.length){
      this.fail("资金信息必传")
      return;
    }
    const { userId } = await this.ctx.service.users.getCurrent()

    if (!userId) {
      this.fail("您的账号已失效，请重新登陆!");
      return;
    }
 
    const result = await this.app.mysql.update('activity', {
      id,
      title,
      title_img,
      status:"0",
      sector,
      userId,
      formstatus,
      content,
      slogan,
      fundingTarget,
      banner,
      overview,
      underwrite,
      website,
      company_logo,
      language,
      type
    })
    
    try {
      highlights.forEach(async ({key,...company}) => {
        const err = await this.ctx.service.highlights.create({ ...company });
        console.log("err", err);
        if (err) {  
          this.fail(err);
          return ;
        }else{
          if(company.id){
            await this.app.mysql.update('highlights', { ...company })
          }else{
            await this.app.mysql.insert('highlights', { ...company, activityId: id })
          }
          
        }
      })
    } catch (e) {
      console.log("catch", e.message)  
      return;
    } 

    try { 
      financial_disclosure.forEach(async ({key,...company}) => {
        const err = await this.ctx.service.finance.create({ ...company });
        console.log("err", err);
        if (err) {  
          this.fail(err);
          return ;
        }else{
          if(company.id){
            await this.app.mysql.update('finance', { ...company  })
          }else{
            await this.app.mysql.insert('finance', { ...company, activityId:id })
          }
         
        } 
      })
    } catch (e) {
      console.log("catch", e.message)  
      return;
    } 

    this.success("创建活动成功!")
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      this.fail("参数缺失！")
      return;
    }
    const result = await this.app.mysql.get('activity', { id });
    if (!result) {
      this.fail("该活动不存在！")
      return;
    }
    await this.app.mysql.update('activity', {
      id,
      status:"-1"
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
 
}

module.exports = ActivityController;