
let user=require('../models/users')
// let expense=require('../models/expenses');
const sequelize = require('../util/database');
const Expenses = require('../models/expenses');


exports.premium_features=async(req,res)=>{
    try{
        let leaderboardofusers=await user.findAll({
            // attributes:['id','name',[sequelize.fn('sum',sequelize.col(expenses.amount))]],
            // include:[
            //     {
            //         model:Expenses,
            //         attributes:[]
            //     }
            // ],
            // group:['user.id'],
            // order:[['total_amount',"DESC"]]
            attributes:["name","totalExpenses"],
            order:[["totalExpenses","DESC"]]
        });
        console.log(leaderboardofusers)
        res.json({leaderboardofusers})

    }catch(e){
        console.log(e)
        res.json("error in leaderboard secton")
    }
}