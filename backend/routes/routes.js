const express=require('express')
const bodyparser=require('body-parser');
let route=express.Router();

let adduser=require('../controllers/add')

route.post("/user/signup",adduser.signup);

module.exports=route