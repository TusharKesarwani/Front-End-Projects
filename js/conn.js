const mongoose = require("mongoose");

// creeating a database 
mongoose.connect("mongodb://localhost:27017/JS",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection succesfull");
}).catch((error)=>{
    console.log(error);
})