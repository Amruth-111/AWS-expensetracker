let Sequelize=require('sequelize');
let sequelize=require('../util/database');

let user=sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    ispremium:{
        type:Sequelize.BOOLEAN
    },
    totalExpenses:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }

})


module.exports=user;
