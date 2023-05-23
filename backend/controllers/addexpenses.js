let expenses=require('../models/expenses');
// let stringinvalid=require('./add')

function isStringInvalid(string){
    if(string===undefined || string.length===0){
        return true;
    }else{
        return false
    }
}

exports.addexpense=async(req,res)=>{
    try{
        let {amount,description,category}=req.body
        if(isStringInvalid(amount)||isStringInvalid(description)||isStringInvalid(category)){
            res.status(500).json("something is missing");
            console.log("fill out all the requires details");
        }
        let result=await expenses.create({
            amount:amount,
            description:description,
            category:category,
            userId:req.user.id
        })
        res.json({newexpense:result})
    }catch(e){
        console.log("error in add method")
        res.status(404).json({error:e})
    }
    
}

exports.showexpenses=async(req,res)=>{
    try{
        let allexpense=await expenses.findAll({where:{userId:req.user.id}});
        res.json({allexpenses:allexpense})
    }catch(e){
        res.status(404).json({error:e})
    }
    
}
exports.deleteexpenses=async(req,res)=>{
    try{
        if(!req.params.id){
            res.json({message:"id is mandatory to delete the expenses"})
        }
        const delid=req.params.id;
        let deleted=await expenses.destroy({where:{id:delid,userId:req.user.id}})
        if(deleted===0){
            return res.status(404).json({success:false,message:"id does not belong to any user"})
        }
        return res.status(200).json({deleted:deleted,message:"deleted sudccessfully"})
    }catch(e){
        console.log("error in expenses delete method")
        res.json({error:e})
    }
}

