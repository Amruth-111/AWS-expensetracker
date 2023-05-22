let expenses=require('../models/expenses');
// let stringinvalid=require('./add')

exports.addexpense=async(req,res)=>{
    try{
        let {amount,description,category}=req.body
        // if(stringinvalid.isStringInvalid(amount)||stringinvalid.isStringInvalid(description)||stringinvalid.isStringInvalid(category)){
        //     res.status(500).json("something is missing");
        //     console.log("fill out all the requires details");
        // }
        let result=await expenses.create({
            amount:amount,
            description:description,
            category:category
        })
        console.log(result);
        res.json({newexpense:result})
    }catch(e){
        console.log("error in add method")
        res.status(404).json({error:e})
    }
    
}

exports.showexpenses=async(req,res)=>{
    try{
        let allexpense=await expenses.findAll();
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
        let deleted=await expenses.destroy({where:{id:delid}});
        res.json({deleted:deleted})
    }catch(e){
        console.log("error in expenses delete method")
        res.json({error:e})
    }
}

