
const Razorpay=require('razorpay');
let purchase=require('../models/purchase')
let user=require('../models/users')

exports.buypremium=async(req,res)=>{
    console.log(process.env.KEY_ID)
    try{
        let rzp=new Razorpay({
            key_id:process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET
    })
    console.log(rzp)
    const amount=2500
    rzp.orders.create({amount,currency:"INR"},async(err,order)=>{
        if(err){
            throw new Error(JSON.stringify(err))
        }
        await purchase.create({
            orderid:order.id,
            status:"PENDING",
            userId:req.user.id
        })
        return res.json({order,key_id:rzp.key_id})
    })

    }catch(e){

        console.log("Razor pay error",e)
        res.json({Error:e})
    }
    

}

exports.updatetransactionstatus=async(req,res)=>{
    try{
        const{payment_id,order_id}=req.body;
        let order=await purchase.findOne({where:{orderid:order_id}})
        if(payment_id===null){
            res.json({message:"payment is failed"})
           return order.update({paymentid:payment_id,status:"FAILED"})
        }
        promise1= order.update({paymentid:payment_id,status:"SUCCESSFULL"})
        promise2= user.update({ispremium:true} ,{where: {id:req.user.id}} )
        Promise.all([promise1,promise2]).then(()=>{
            return res.json({success:true,message:"transcation successfull"})
        }).catch((err)=>{
            throw new Error("error in promise")
        })  
    }catch(e){
        throw new Error(error)
    }
}


    // try{
    //         const payment_id=req.body.payment_id
    //         const order_id=req.body.order_id
    //         console.log(payment_id)
            
    //         const order=await purchase.findOne({where:{orderid:order_id}})
            
    //         if(payment_id===null){
    //             res.json({message:"payment is failed"})
    //           return  order.update({paymentid:payment_id,status:"FAILED"})
    //         }
    //         function updateTable(order){
    //            return new Promise((resolve)=>{
    //                 resolve(order.update({paymentid:payment_id,status:"SUCCESS"}))
    //            }) 
    //         }
    //         function updateUserTable(){
    //             return new Promise((resolve)=>{
    //                resolve(req.user.update({premium:true}))
    //             })
    //         }
    //         Promise.all([updateTable(order),updateUserTable()]).then(()=>{
    //             res.json({success:true,token:createToken(req.user.id,true)})
    //         })
    //     }catch(err){
    //         console.log("error in update transaction",err)
    //         res.json({Error:err})
    //     }
   

    // }

// try{
//     const paymentid=req.body.payment_id
//     const orderid=req.body.order_id
    
//     const result=await orderDb.findOne({where:{orderId:orderid}})
    
//     if(paymentid===null){
//         res.json({message:"payment is failed"})
//       return  result.update({paymentId:paymentid,status:"FAILED"})
//     }
//     function updateTable(result){
//        return new Promise((resolve)=>{
//             resolve(result.update({paymentId:paymentid,status:"SUCCESS"}))
//        }) 
//     }
//     function updateUserTable(){
//         return new Promise((resolve)=>{
//            resolve(req.user.update({premium:true}))
//         })
//     }
//     Promise.all([updateTable(result),updateUserTable()]).then(()=>{
//         res.json({success:true,token:createToken(req.user.id,true)})
//     })
// }catch(err){
//     console.log("error in update transaction",err)
//     res.json({Error:err})
// }