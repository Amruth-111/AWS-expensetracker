
let user=require('../models/users')
let expense=require('../models/expenses')

exports.premium_features=async(req,res)=>{
    try{
        let users=await user.findAll();
        let expenses=await expense.findAll();
        const userAggregatedExpenses=[];
        console.log(expenses);

        expenses.forEach((expense)=>{
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId]+=expense.amount;
            }else{
                userAggregatedExpenses[expense.userId]=expense.amount
            }
        })
        var userleaderboarddetails=[];
        users.forEach(user=>{
            userleaderboarddetails.push({name:user.name,total_amount:userAggregatedExpenses[user.id] ||0})
        })

        console.log(userleaderboarddetails)
        userleaderboarddetails.sort((a,b)=>b.total_amount-a.total_amount)
        res.json({userleaderboarddetails})

    }catch(e){
        res.json("error in leaderboard secton")
    }
}