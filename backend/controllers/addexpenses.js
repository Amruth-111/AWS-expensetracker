let expenses=require('../models/expenses');
let user=require('../models/users');
const sequelize = require('../util/database');
// let stringinvalid=require('./add')

function isStringInvalid(string){
    if(string===undefined || string.length===0){
        return true;
    }else{
        return false
    }
}


exports.addexpense=async(req,res)=>{
    const t=await sequelize.transaction();
    try{
        let {amount,description,category}=req.body
        if(isStringInvalid(amount)||isStringInvalid(description)||isStringInvalid(category)){
            return res.json("something is missing");
        }
        let result=await expenses.create({
            amount:amount,
            description:description,
            category:category,
            userId:expenseid
        },{transaction:t})
        const totalExpense=Number(req.user.totalExpenses)+Number(amount)
        await user.update({totalExpenses:totalExpense},
            {
                where:{id:req.user.id},
                transaction:t
            })
        console.log(result)
        await t.commit();
        // const users=await user.findByPk(totalexpid.id)
        // console.log(users.totalExpenses)
        // users.totalExpenses=Number(users.totalExpenses)+Number(amount)
        // users.save();
        // console.log(totalExpenses)
        res.json({newexpense:result})
    }catch(e){
        await t.rollback();
        console.log("error in add method")
        res.json({error:e})
    }
    
}
let expenseid
exports.showexpenses=async(req,res)=>{
    expenseid=req.user.id
    try{
        let allexpense=await expenses.findAll({where:{userId:expenseid}});
        res.json({allexpenses:allexpense})
    }catch(e){
        res.status(404).json({error:e})
    }
    
}
exports.deleteexpenses=async(req,res)=>{
    const t=await sequelize.transaction();
    try{
        if(!req.params.id){
            res.json({message:"id is mandatory to delete the expenses"})
        }
        const delid=req.params.id;
        console.log(req.user.totalExpense)
        const expense=await expenses.findOne({
            where:{
                id:delid
            }
        })
        console.log(expense.amount)
        console.log(req.user.totalExpenses)
        let deleted=await expenses.destroy({where:{id:delid,userId:req.user.id}},{transaction:t})
        const totalExpense=Number(req.user.totalExpenses)- Number(expense.amount)
        console.log(totalExpense)
        let upt=await user.update({totalExpenses:totalExpense},{
            where:{id:req.user.id},
            transaction:t
        })
        console.log(upt)
        if(deleted===0){
            return res.json({success:false,message:"id does not belong to any user"})
        }
        await t.commit();
        return res.json({deleted:deleted,message:"deleted sudccessfully"})
    }catch(e){
        await t.rollback();
        console.log("error in expenses delete method")
        res.json({error:e})
    }
}

