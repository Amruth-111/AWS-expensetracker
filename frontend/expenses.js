let amount=document.getElementById("amount")
let description=document.getElementById("description")
let category=document.getElementById("category")
let button=document.getElementById("press")
let error=document.getElementById("error")
let parentNode=document.getElementById("allExpenses")
let success=document.getElementById("success")

function ispremium(){
    let successTxt=document.createTextNode("You are a premium user..!!!");
    success.appendChild(successTxt);
    success.style.color="green";
    document.getElementById("premium").style.visibility="hidden"
    
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
window.addEventListener("DOMContentLoaded", async()=>{
    try{
        const token=localStorage.getItem("token");
        const isdecodedpremium=parseJwt(token);
        console.log(isdecodedpremium)
        const isPremiumUser=isdecodedpremium.ispremium
        if(isPremiumUser){
            ispremium()
            showleaderboard();
        }
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
                let result=await axios.post("http://localhost:8081/purchase/updatetransactionstatus",{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id
                },{headers:{"Authentication":token}})
                alert("you are a premium user now")
                let successTxt=document.createTextNode(result.data.message);
                success.appendChild(successTxt);
                success.style.color="green";
                document.getElementById("premium").style.visibility="hidden"
                localStorage.setItem("token",result.data.token)

            },
        }
        const rzp1=new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    
        rzp1.on("payment.failed",async()=>{
            try{
                let key=response.data.order.id
                let failed=await axios.post("http://localhost:8081/purchase/updatetransactionstatus",{
                    order_id:key,
                    payment_id:null
                },{headers:{"Authentication":token}})
                alert(failed.data.message)
                let successTxt=document.createTextNode(failed.data.message);
                success.appendChild(successTxt);
                success.style.color="red";
                showleaderboard()
            }catch(e){
                console.log("error in payment fail section",e)
            }
        })
           
    }catch(err){
        console.log("err in front end of razorpay",e)
    }
    
    
} 


async function showleaderboard(){
    let token=localStorage.getItem("token")
    let parent=document.getElementById("leaderboard")
    let button=document.createElement('input')
    button.type="button";
    button.value="show leaderboard";
    button.onclick=async()=>{
        let userleaderboardarray=await axios.get("http://localhost:8081/premium/show-leaderboard",{headers:{"Authentication":token}})
        console.log(userleaderboardarray.data.userleaderboarddetails);
        let leaderboard=userleaderboardarray.data.userleaderboarddetails
        let leaderboards=document.getElementById("list");
        leaderboard.forEach(userdetails => {
        leaderboards.innerHTML+=`<li>Name-${userdetails.name}--Total expense-${userdetails.total_amount}`
        });
    }
    parent.appendChild(button)
    
}
