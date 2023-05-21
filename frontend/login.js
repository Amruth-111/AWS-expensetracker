const email=document.getElementById("email")
const password=document.getElementById("password")
const login=document.getElementById("login")
const loginError=document.getElementById("loginError")
const loginSuccess=document.getElementById("loginSuccess")

login.addEventListener("click",loginpage);

async function loginpage(e){
    try{
        e.preventDefault();

        let loginObj={
            email:email.value,
            password:password.value,
        }
    
        let data=await axios.post("http://localhost:8080/user/signin",loginObj)
        console.log(data)

    }catch(e){
        console.log(e)
    }
   
}

