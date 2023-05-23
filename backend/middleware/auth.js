const User=require('../models/users');
let jwt=require('jsonwebtoken')

const authentication=async(req,res,next)=>{
    try{
        const token=req.header('Authentication');
        const user =jwt.verify(token,"amsnshshadshkncm283u2oi901nxkjINZ9N0Z90219");
        if(!user){
            return res.status(404).json({message:"there is no such userid"})
        }
        console.log(user.userId)
        let person=await User.findByPk(user.userId)
        req.user=person;
        next();
    }catch(e){
        console.log(e);
        res.status(500).json({success:false})
    }
}

module.exports={
    authentication
}