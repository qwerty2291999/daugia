const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cron = require('node-cron');
app.use(express.json());
const AuctionServices = require('./src/admin/auction/auction.services');
const auction = new AuctionServices;
const Middleware = require('./src/auth/auth.middlware');
const middlware = new Middleware;
const cookieParser = require('cookie-parser');
app.use(cookieParser())
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
const UserAPI = require('./src/user/user.api');
app.use("/user",UserAPI)

// const sentNotify = async () =>{
//     const filter = auction.notify();
//     console.log(filter)
// }
const changStatus = async () =>{
    const docs =  await auction.changeStatus();
    if(docs.length>0){
        docs.map(async (doc)=>{
            await auction.updateOne({id:doc._id,status:"completed"})
        })
    }
}
cron.schedule('* * * * *', async () => {
    changStatus();
});