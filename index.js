const express = require('express');
const app = express();
const body_parser = require('body-parser');
const router = require('./routes/audience');
const dbconnection = require('./commonUtils/dbConnections')
const port = process.env.PORT || 5200;
//require('dotenv').config();

//   "mongodb://localhost:27017/newDB", 

//console.log(process.env.Mongo_URL)


app.use(body_parser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))




app.use('/',router)


app.listen(port,()=>{
    console.log("running on port on 5200" );
})