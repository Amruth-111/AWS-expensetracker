const express=require('express')
const bodyparser=require('body-parser');
let route=express.Router();

let adduser=require('../controllers/add')
const expenses=require('../controllers/addexpenses')

route.post("/signup",adduser.signup);
route.post("/signin",adduser.signin);

route.post('/expenses',expenses.addexpense);
route.get('/show-expenses',expenses.showexpenses)
route.delete('/delete-expenses',expenses.deleteexpenses)

module.exports=route