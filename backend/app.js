const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');
const usertable=require('./models/users');
const exptable=require('./models/expenses')
const users=require('./routes/user');
let expenses=require('./routes/expenses');



const app=express();
app.use(cors());
app.use(bodyparser.json())

usertable.hasMany(exptable);
exptable.belongsTo(usertable);  


app.use('/user',users)
app.use('/expense',expenses)

sequelize.sync().then(()=>{
    app.listen(8080)
}).catch(e=>{
    console.log(e)
})