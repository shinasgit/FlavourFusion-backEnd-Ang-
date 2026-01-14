
const  jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside Jwt Middleware");
    // find token
    const token = req.headers.authorization.slice(7)
    
    console.log(token);
    // verify token
    try {
    const jwtVerification =jwt.verify(token,process.env.jwtKey)
    console.log(jwtVerification);
    req.payload = jwtVerification.userId
    next()
    } catch (error) {
        res.status(401).json("Authentication Error",error)
    }
    
    
}
module.exports = jwtMiddleware




















