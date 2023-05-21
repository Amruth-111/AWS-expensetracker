
let users=require('../models/define');

function isStringInvalid(string){
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

        const data=await users.create({
            name:name,
            email:email,
            password:password
    })
    res.status(201).json({useradd:data})
    }catch(e){
        console.log("error in signup method");
        res.status(404).json({error:e})
        res.json({error:"kunne email unique kodu"})
    }
    
}

exports.signin=async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(isStringInvalid(email)|| isStringInvalid(password)){
            return res.status(400).json({error:"something is missing"})
        }

        const user = await users.findAll({ where: { email:email } });
        console.log(user)
        if(user){
            const passwords=await users.findOne({where:{password}})
            console.log(passwords)
            if(passwords){
                res.json({res:"loginsuccessfull"})
            }else{
                res.status(404).json({res:"wrong password"})
                console.log("wrong password")
            }
        }else{
           res.status(400).json({error:"user do not exist"})
        }

    }catch(e){
        res.json({error:e})
    }
}


