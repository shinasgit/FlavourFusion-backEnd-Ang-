const User = require("../models/userModel")
const bcrypt = require("bcrypt")

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
        const existingUser = await User.findOne({email})
        if(existingUser){
            const currentPswd = await bcrypt.compare(password,existingUser.password)
            if(currentPswd){
             res.status(200).json({ message: "Login Successfully",existingUser })

            }else{
             res.status(401).json({ message: "Password mismatch" })

            }
        }else{
            res.status(400).json({ message: "user not found"})

        }
    } catch (error) {
        res.status(500).json("Login Failed")
    }
}