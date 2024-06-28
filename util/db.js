//to connect sequelize with mysql

const Sequelize = require('sequelize');
const sequelize= new Sequelize('projectnode','root','jiffygelpen',{
  dialect:'mysql',
  host:'localhost'
});

module.exports=sequelize;