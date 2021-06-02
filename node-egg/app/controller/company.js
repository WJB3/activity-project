'use strict';

const Controller = require('../controller/base');

class CompanyController extends Controller {

  async getList() {  
        const company = await this.ctx.service.company.getCompany(); 
        this.success(company);
        return company;
  }

  async getHighlight(){
    const { id } =this.ctx.params;
    const highlights = await this.ctx.service.company.getHighlight(id); 
    this.success(highlights);
  }

  async getFinance(){
    const { id } = this.ctx.params;
    const finance = await this.ctx.service.company.getFinance(id); 
    this.success(finance);
  }
   
 
}

module.exports = CompanyController;