
const mongoose = require("mongoose")

const dbString = process.env.connectionString

mongoose.connect(dbString).then(res=>{
    console.log("Server connected to db");
    
}).catch(err=>{
    console.log("Error in connecting db"+err);
    
})