const express = require('express');
const cors = require('cors')
require('dotenv').config();
const JWT = require('jsonwebtoken');
const port = process.env.PORT || 5000
const app= express();
app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send(`server is running on port ${port}`)
})

app.listen(port , (req,res)=>{
    console.log('localhost play on port 5000')
})