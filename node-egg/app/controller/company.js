'use strict';

const Controller = require('../controller/base');

class CompanyController extends Controller {

  async getList() {  
        const company = await this.ctx.service.company.getCompany(); 
        this.success(company);
        return company;
  }

   
 
}

module.exports = CompanyController;