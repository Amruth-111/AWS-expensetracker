let amount=document.getElementById("amount")
let description=document.getElementById("description")
let category=document.getElementById("category")
let button=document.getElementById("press")
let error=document.getElementById("error")
let parentNode=document.getElementById("allExpenses")
// let premiumbtn=document.getElementById("premium")

window.addEventListener("DOMContentLoaded", async()=>{
    try{
        const token=localStorage.getItem("token");
        let response=await axios.get("http://localhost:8081/expense/show-expenses",{headers:{'Authentication':token}})
        console.log(response);
        console.log(response.data)
        for(let i=0;i<response.data.allexpenses.length;i++){
            showBrowser(response.data.allexpenses[i])
        }
    }catch(err){
        console.log("DOM get error-->",err) 
    }
})

async function showBrowser(data){
    try{
        var childNode=`<li id=${data.id}>${data.amount}&nbsp;&nbsp;&nbsp;&nbsp;${data.description}&nbsp;&nbsp;&nbsp;&nbsp;${data.category}
        <button class="btn bg-danger float-sm-end" onclick="deleteExpense(${data.id})">delete</button>
        <button class="btn bg-primary float-sm-end" onclick="editExpense('${data.id}','${data.amount}','${data.description}','${data.category}')" >edit</button></li>`
        parentNode.innerHTML=parentNode.innerHTML+childNode;
    }
    catch(err){
        console.log("showbrowser error!",err)
    }
}

async function deleteExpense(key){
    const token=localStorage.getItem("token");
    await axios.delete(`http://localhost:8081/expense/delete-expenses/${key}`,{headers:{'Authentication':token}})
    const child=document.getElementById(key)
    parentNode.removeChild(child)
}

button.addEventListener("click",async(e)=>{
    const token=localStorage.getItem("token");
    console.log("button is clicked")
    try{
        e.preventDefault();
        let exp_obj={
            amount:amount.value,
            description:description.value,
            category:category.value
        }

        let response=await axios.post("http://localhost:8081/expense/expenses",exp_obj,{headers:{'Authentication':token}})
        console.log(response.data.newexpense);
        showBrowser(response.data.newexpense);
    
    }catch(e){
        console.log("error in submit button");
        console.log(`${e.message}`);
    }
   
    amount.value="";
    category.value="";
    description.value="";
})

document.getElementById("premium").onclick=async(e)=>{
    try{
        let token=localStorage.getItem("token");
        console.log(token)
        let response=await axios.get("http://localhost:8081/purchase/buy-premium",{headers:{"Authentication":token}})
        console.log(response)
        let options={
            'key':response.data.key_id,
            "order_id":response.data.order.id,
            "handler":async function(response){
                await axios.post("http://localhost:8081/purchase/updatetransactionstatus",{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id
                },{headers:{"Authentication":token}})
                alert("you are a premium user now")
            },
    
        }
        const rzp1=new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    
        rzp1.on("payment.fail",async(response)=>{
            try{
                let key=response.data.order.id
                await axios.post("http://localhost:8081/purchase/updatetransactionstatus",{
                    order_id:key,
                    payment_id:null
                },{headers:{"Authentication":token}})
                alert(response.data.message)
            }catch(e){
                console.log("error in payment fail section",e)
            }
            
        })
           
    }catch(err){
        console.log("err in front end of razorpay",e)
    }
    
    
} 
