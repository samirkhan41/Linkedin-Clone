
import genToken from "../config/token.js";
import User from "../models/usermodel.js";
import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body

        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(500).json({ message: "please fill all the details first " })
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
            });
        }
        let existEmail = await User.findOne({ email })
        if (existEmail) {
            return res.status(400).json({ message: "brother you  have  already registerd with this email" })
        }
        let existUser = await User.findOne({ userName })
        if (existUser) {
            return res.status(400).json({ message: "brother you  have  already registerd with this userName" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const userCreated = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword

        })

        let token = await genToken(userCreated._id)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 100,
            sameSite: "strict",
            secure: process.env.NODE_ENVIROMENT === "production"
        })
        return res.status(201).json({ message: "User is created successFully", userCreated })
    }
    catch (error) {
        console.log("signup me error hai ")
        return res.status(500).json({ messge: "Something is error from the signUp Functin " })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ messge: "please provide every details " })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ message: "you dont have account please create a account first " })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ messge: "Incorrect password " })
        }

        let token = await genToken(user._id)

       


        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 100,
            secure: process.env.NODE_ENVIROMENT === "production",
        })

        return res.status(200).json({ message: "User successFully login " }, user)
    }
    catch (error) {
        console.log("LOGIN ERROR:", error.message);


        return res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "User Logout successFully" })
    } catch (error) {
        return res.status(500).json({ messge: "something is wrong from the logout Function " }, error.message)
    }
}