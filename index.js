//Import
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
const PaticipantsServices = require('./src/admin/participants/participants.sevices');
const participants = new PaticipantsServices;
const NotificationServices = require('./src/user/notification/user.notification.services');
const notifications = new NotificationServices
const UserSevices = require('./src/user/user.services');
const user = new UserSevices
const Random = require('./lib/RandomString');
const random = new Random
const Timer = require('./lib/Timer');
const timer = new Timer
const cookieParser = require('cookie-parser');
app.use(cookieParser())
//Port
const port = 3000;
app.listen(port,()=>console.log("app running on port:3000"))
//Connect Mongodb
const url = "mongodb://localhost:27017/test"
mongoose.connect(url,{ useUnifiedTopology:true,useNewUrlParser: true });
//
app.get("/",async(req,res)=>{
    res.json("index")
})
//Route
const AuthAPI = require('./src/auth/auth.api')
app.use("/auth",AuthAPI)
const ProductsAPI = require('./src/products/products.api');
app.use("/products",ProductsAPI)
const AdminAPI = require('./src/admin/admin.api')
app.use("/admin",middlware.Auth,middlware.Author,AdminAPI)
const AdminAuctionAPI = require('./src/admin/auction/auction.api');
app.use("/admin/auction",AdminAuctionAPI)
const AdminParticipants = require('./src/admin/participants/participants.api');
app.use("/admin/participants",AdminParticipants);
const UserAPI = require('./src/user/user.api');
app.use("/user",middlware.Auth,UserAPI)
const NotificationAPI = require('./src/user/notification/user.notification.api')
app.use("/user/notification",NotificationAPI)
const Auctions = require('./src/auction/auction.api');
app.use("/auctions",Auctions)
//Schedule API
const changStatus = async () =>{
    const docs =  await auction.changeStatus();
    if(docs.length>0){
        docs.map(async (doc)=>{
            const findWinner = await participants.findOne({auctionId:doc.auctionId})
            const winner = findWinner.filter((winner)=>{
                return Math.max(winner.betPrice)
            })
            const a = winner[0]
            await user.push({_id:a.userId},a.auctionId)
            await auction.updateOne({id:doc._id,status:"completed"})
        })
    }
}
const sentNotify = async () =>{
    const docs = await auction.sentNotify();
    if(docs.length>0){
        docs.map(async (doc)=>{
            const participant = await participants.findOne({auctionId:doc.auctionId})
            participant.map(async (doc)=>{
                const id = "noti"+random.random(12)
                const now = timer.now();
                const uid = doc.userId
                const aucid = doc.auctionId;
                const info = doc.noti
                await notifications.create({_id:id,info,userID:uid,date:now,AuctionID:aucid})
            })
        })
    }
}
cron.schedule('* * * * *', async () => {
    changStatus();
    sentNotify();
});