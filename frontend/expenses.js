let amount=document.getElementById("amount")
let description=document.getElementById("description")
let category=document.getElementById("category")
let button=document.getElementById("press")
let error=document.getElementById("error")
let parentNode=document.getElementById("allExpenses")

window.addEventListener("DOMContentLoaded", async()=>{
    try{
        let response=await axios.get("http://localhost:8080/user/show-expenses")
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
    await axios.delete(`http://localhost:8080/user/delete-expenses,${key}`)
    const child=document.getElementById(key)
    parentNode.removeChild(child)
}

button.addEventListener("click",async(e)=>{
    console.log("button is clicked")
    try{
        e.preventDefault();
        let exp_obj={
            amount:amount.value,
            description:description.value,
            category:category.value
        }
        // console.log(exp_obj)
        // console.log(exp_obj.amount)
        // console.log(exp_obj.category)

        let response=await axios.post("http://localhost:8080/user/expenses",exp_obj)
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