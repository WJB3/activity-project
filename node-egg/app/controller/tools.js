'use strict';

const Controller = require('egg').Controller;
const pump=require('pump');
const fs=require('fs');

class HomeController extends Controller {
  async saveImage() {
    const { ctx } = this;
    const parts=ctx.multipart({autoFields:true});
    let files={};
    let stream;
    while((stream=await parts())!=null){
        if(!stream.filename){
            break;
        }
        const fieldname=stream.fieldname;
        //上传图片的目录
        const dir=await this.service.tools.getUploadFile(stream.filename);
        const target=dir.uploadDir;
        const writeStream=fs.createWriteStream(target);

        await pump(stream,writeStream);

        files=Object.assign(files,{
            [fieldname]:dir.saveDir
        })
    }
    if(Object.keys(files).length>0){
        ctx.body={
            code:200,
            message:'图片上传成功',
            data:files
        }
    }else{
        ctx.body={
            code:500,
            message:'图片上传失败',
            data:{}
        }
    }
  }
}

module.exports = HomeController;
