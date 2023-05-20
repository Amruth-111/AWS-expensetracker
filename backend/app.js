const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');
const routes=require('./routes/routes')


const app=express();
app.use(cors());
app.use(bodyparser.json())
app.use(routes)

sequelize.sync().then(()=>{
    app.listen(8080)
}).catch(e=>{
    console.log(e)
})