
let users=require('../models/define');

exports.signup=async(req,res)=>{
    try{
        let name=req.body.name;
        let email=req.body.email;
        let password=req.body.password;

        const data=await users.create({
            name:name,
            email:email,
            password:password
    })
    res.json({useradd:data})
    }catch(e){
        console.log("error in signup method");
        res.json({error:e})
    }
    
}


