require('dotenv').config()
const express = require("express")
require("./config/db")
const cors = require("cors")
const router = require("./routes/route")
const fServer = express()
fServer.use(cors())
fServer.use(express.json())
fServer.use(router)
const PORT = 3000

fServer.listen(PORT,()=>{
    console.log("server running on ",PORT);
    
})