const express = require('express');
const app = express.Router();

app.get('/',(req,res)=>{
    res.json("admin route")
})

module.exports = app;