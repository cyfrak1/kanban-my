const express = require("express");
const fs = require("fs");
const path = require("path")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
    next();
});
app.post('/api/login',(req,res)=>{
    console.log(req.body);
    const userPath = path.join(__dirname,"./json/user.json");
    const user = {
        "email":"superuser@seco.com",
        "password":"key123"
    };
    if(user.email == req.body.email && user.password == req.body.password){
        res.status(201).json({
            message:"Access Allowed, Welcome In System",
            status:"OK"
        });
    }
    else{
        res.status(422).json({
            message:"Incorrect user, Login Failed",
            status:"DENIED"
        })
    }
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
});