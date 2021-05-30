# 第一步：创建数据库 

create database activity_database;

# 第二步：使用创建的数据表

use activity_database;

# 第三步：查看当前使用的数据库

select database();

# 第四步：创建超级管理员表

create table admin(id int(11) primary key auto_increment,username varchar(255),password varchar(255));

# 第五步：查看表中的字段

show create table admin

# 第六步：创建会员表(账号名称，密码，邮箱，手机号，状态 0-审核未通过 1-审核已通过) 

create table users(id int(11) primary key auto_increment,username varchar(255),password varchar(255),email varchar(255),phone varchar(255),status varchar(255));

# 第七步：创建活动表(活动标题，标题图片，活动部门，活动状态，活动内容，融资目标，活动口号，活动横幅，活动概述，活动承销，公司网站，公司logo,财务信息披露,活动类型 stock-股权 debt-债权，语言)

create table activity(id int(11) primary key auto_increment,title varchar(255),title_img varchar(255),sector varchar(255),status varchar(255),content varchar(255),
fundingTarget varchar(255),slogan varchar(255),banner varchar(255),overview varchar(255),underwrite varchar(255),website varchar(255),company_logo varchar(255),
financial_disclosure varchar(255),type varchar(255),language varchar(255));


# 第八步：创建企业表(企业名称,上市地点,注册地址,评级机构,最新评级,历史评级)

create table company(id int(11) primary key auto_increment,name varchar(255),whereadress varchar(255),registeradress varchar(255), ratingagencies varchar(255),latestrating varchar(255),historyrating varchar(255));

# 第九步：向用户表插入一些数据

insert into users(username,password,email,phone,status) values('测试人员一','www1793.','10674096@qq.com','18072020225','1');

# 第十步：查询插入是否成功
select  *  from users;

# 第十一步：删除刚插入的错误的数据
delete from users where id  = 3

# 第十二步：在活动表插入userId字段，准备关联用户表
alter table activity add userId int

# 第十三步：创建主外键关联关系
alter table activity add foreign key(userId) references users(id);

# 第十四步：修改stock为字符类型
alter table company modify column stockcode varchar(255);

# 第十五步：修改stock为字符类型
create table finance(id int(11) primary key auto_increment,year varchar(255),total varchar(255),liabilityratio varchar(255), operatingactivities varchar(255),operatingincome varchar(255),netprofit varchar(255));
 
