const Sequelize=require('sequelize');
const sequelize=new Sequelize("awsexpenses","root","Admin@123",{
    dialect:"mysql",
    host:"localhost"
})

module.exports=sequelize;