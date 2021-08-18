const express = require('express');
const app = express.Router();
const NotificationServices = require('./user.notification.services')
const notifySevice = new NotificationServices;

app.get('/',async(req,res)=>{
    const decoded = req.decoded;
    const uid = decoded.uid
    const docs = await notifySevice.get(uid);
    res.json(docs)
})

module.exports = app;