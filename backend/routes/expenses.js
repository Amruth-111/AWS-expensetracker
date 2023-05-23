const express=require('express')
const bodyparser=require('body-parser');


let route=express.Router();

const user_authenticate=require('../middleware/auth')
const expenses=require('../controllers/addexpenses')


route.post('/expenses',user_authenticate.authentication,expenses.addexpense);
route.get('/show-expenses',user_authenticate.authentication,expenses.showexpenses)
route.delete('/delete-expenses/:id',user_authenticate.authentication,expenses.deleteexpenses)

module.exports=route