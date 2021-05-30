'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt } = app; 

  //user接口
  router.get('/user/list', jwt,controller.users.getList);
  //查看当前登陆用户信息
  router.get('/user/current',jwt,controller.users.current);
  //增加会员/注册
  router.post('/user',controller.users.create);
  //删除会员
  router.delete('/user/:id',jwt,controller.users.delete);
  //查看会员
  router.get('/user/:id',jwt,controller.users.get);
  //编辑会员
  router.put('/user',jwt,controller.users.edit); 
 
  //发送验证码
  router.post('/user/sendCode',controller.users.sendCode); 

  //登陆接口
  router.post('/login',controller.auth.login);

  //创建活动接口
  router.post('/activity',jwt,controller.activity.create)
  //活动列表接口
  router.get('/activity/list', jwt,controller.activity.getList);
  //删除会员
  router.delete('/activity/:id',jwt,controller.activity.delete);

  //管理员注册
  router.post('/admin',controller.admin.create);
  //查看所有管理员
  router.get('/admin/list',controller.admin.getList);

  //添加公司
  //router.post('/company',jwt,controller.company.create)
  //查看公司
  router.get('/company/list',jwt,controller.company.getList);
};
