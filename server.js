const express = require("express");
const cors = require("cors");
const { pool } = require("./config/dbConnect");
var bodyParser = require('body-parser')
const app = express()

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

const StudentApi = require('./src/api/student.api');

pool.getConnection((err) =>{
    if(err){
        console.error('Error getting connection from pool:', err);
    } else {
        console.log('Connected to MySQL server');
    }
});

app.use('/student', StudentApi());

app.listen(PORT,() => {
    console.log(`Server is up and running on ${PORT} ` );
})