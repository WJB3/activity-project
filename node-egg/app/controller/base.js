const { Controller } =require('egg');

class BaseController extends Controller{
    success(data){
        this.ctx.body={
            code:200,
            msg:'success',
            data
        }
    }

    fail(msg){
        msg=msg||'参数有误';
        this.ctx.body={
            code:500,
            msg:msg, 
        }
    }
}

module.exports=BaseController;