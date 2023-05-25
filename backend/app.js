const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const Razorpay=require('razorpay');

const sequelize=require('./util/database');
const usertable=require('./models/users');
const exptable=require('./models/expenses')
const users=require('./routes/user');
const expenses=require('./routes/expenses');
const purchase=require('./routes/purchase');
const premiumtable=require('./models/purchase');


const app=express();
app.use(cors());
app.use(bodyparser.json())

usertable.hasMany(exptable);
exptable.belongsTo(usertable);  

usertable.hasMany(premiumtable)
premiumtable.belongsTo(usertable)

app.use('/user',users)
app.use('/expense',expenses)
app.use('/purchase',purchase)

sequelize.sync().then(()=>{
    app.listen(8081)
}).catch(e=>{
    console.log(e)
})