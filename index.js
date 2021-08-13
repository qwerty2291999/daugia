const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cron = require('node-cron');
app.use(express.json());
// 
const port = 3000;
app.listen(port,()=>console.log("app running on port:3000"))
//
const url = "mongodb://localhost:27017/test"
mongoose.connect(url,{ useUnifiedTopology:true,useNewUrlParser: true });
//
app.get("/",(req,res)=>{
    res.json("index")
})
//
const AuthAPI = require('./src/auth/auth.api')
app.use("/auth",AuthAPI)
const ProductsAPI = require('./src/products/products.api');
app.use("/products",ProductsAPI)
const AdminAPI = require('./src/admin/admin.api')
app.use("/admin",AdminAPI)
const AdminAuctionAPI = require('./src/admin/auction/auction.api');
app.use("/admin/auction",AdminAuctionAPI)
//6 sao = 1 sec 5 = 1p 4 = 1h if number instead * run every same sec of a min 
cron.schedule('* * * * *', () => {
    console.log('running a task every min');
});