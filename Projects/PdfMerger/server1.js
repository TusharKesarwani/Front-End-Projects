const express=require('express')
const multer = require('multer')
const upload=require('./uploadfile')
const path = require('path')
const app=express()
const port = 3000

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})



app.post('/uploadfile', upload.single('file1'), function (req, res, next) {
    if(req.file){ // use req.file instead of req.files
        console.log(req.file); // use req.file instead of res.files
        console.log("file uploaded"); // correct message
        res.send("file uploaded"); // send a response to the client
    } else {
        console.log("file not uploaded"); // correct message
        res.send("file not uploaded"); // send a response to the client
    }
})

app.listen(port,()=>{
    console.log("App is listening on port 3000 ");
})

