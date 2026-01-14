const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.regUser = async (req, res) => {
    console.log("inside register user");
    const { username, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json("User already Existing")
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            console.log(encryptedPassword);

            const newUser = new User({ username, email, password: encryptedPassword })
            await newUser.save()
            res.status(200).json({ message: "Registered Successfully", newUser })
        }
    } catch (error) {
        res.status(500).json("Registration Failed")
    }
}

exports.loginUser = async (req, res) => {
    console.log("Inside login user");
    const {email,password} = req.body
    try {
        console.log("inside try");
        
        const existingUser = await User.findOne({email})
        console.log(existingUser);
        
        if(existingUser){
            const currentPswd = await bcrypt.compare(password,existingUser.password)
            console.log(currentPswd);
            
            if(currentPswd){
                const token = jwt.sign({userId:existingUser._id},process.env.jwtKey)
                console.log(token);
                
                res.status(200).json({ message: "Login Successfully",user:existingUser,token })
            }else{
                res.status(401).json({ message: "Password mismatch" })
            }
        }else{
            res.status(400).json({ message: "user not found"})
        }
    } catch (error) {
        res.status(500).json("Login Failed",error)
    }
}