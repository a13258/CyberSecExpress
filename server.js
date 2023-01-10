const express= require('express')
const path=require('path')
const bodyParser=require('body-parser')
const mongoose= require('mongoose')
const cors = require('cors');


let port=997
//env variables
require('dotenv').config();

//Connection to database
const uri=process.env.ATLAS_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> console.log('ligado ao mongo'))
        .catch(err =>console.error('nao foi possivel ligar',err))

//Model
require("./models/userModel"); 


//Midleware
const app=express()
app.use('/', express.static(path.join(__dirname,'static')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());

//Routes
app.use("/api",require('./routes/user.Routes'));

app.listen(port, ()=>{
    console.log('service port',port)
})