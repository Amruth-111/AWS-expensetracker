const email=document.getElementById("email");
const mail=document.getElementById("mail");

mail.addEventListener("click",async(e)=>{
    try{
        e.preventDefault();
        let forgot_obj={
            email:email
        }

        const response=await axios.post("http://localhost:8081/password/forgot_password",forgot_obj)
        console.log(response)
    }catch(err){
        console.log("error in send mail button")
    }
   

})