let Sequelize=require('sequelize');
let sequelize=require('../util/database');

let premium=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING
})

module.exports=premium