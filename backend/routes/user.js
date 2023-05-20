const express=require('express')
const bodyparser=require('body-parser');
let route=express.Router();

let adduser=require('../controllers/add')

route.post("/signup",adduser.signup);

module.exports=route