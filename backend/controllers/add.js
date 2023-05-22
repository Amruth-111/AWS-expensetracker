
let bcrypt=require('bcrypt')
let users=require('../models/define');

exports.isStringInvalid=(string)=>{
    if(string===undefined || string.length===0){
        return true;
    }else{
        return false
    }
}

exports.signup=async(req,res)=>{
    try{
        let {name,email,password}=req.body;
        if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)){
           return res.status(400).json({error:"something is missing"})
        }
        bcrypt.hash(password,10,async(err,hash)=>{
            await users.create({
                name:name,
                email:email,
                password:hash
        })
        })
    res.status(201).json({message:"signup successfull"})
    }catch(e){
        console.log("error in signup method");
        res.status(404).json({error:e})
    }
    
}

exports.signin=async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(isStringInvalid(email)|| isStringInvalid(password)){
            return res.status(400).json({error:"something is missing"})
        }

        const user = await users.findAll({ where: { email:email } });
        // console.log('this user',user)
        // console.log('user',user[0])
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    res.status(500).json({success:false,message:"something went wrong"})
                }
                if(result===true){
                   res.status(201).json({success:true,message:"login successfull"}) 
                }
                else{
                    res.status(500).json({success:false,message:"password doesnt match"})
                }
            })
            }else{
                res.status(404).json({success:false,message:"user doesnot exist"})
                console.log("userdoesnot exist")
            }
        }

    catch(e){
        res.json({error:e})
    }
}


