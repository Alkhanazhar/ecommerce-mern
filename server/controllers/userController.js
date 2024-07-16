import bcrypt from "bcryptjs"
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"

export const userSignupController = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!email) {
            throw new Error("Please enter your email address")
        }
        if (!username) {
            throw new Error("Please enter your username")
        }
        if (!password) {
            throw new Error("Please enter your password")
        }
        const exist = await User.findOne({ email: email })
        if (exist) {
            throw new Error(" Email already exists")
        }
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password, salt)
        if (!hash) throw new Error("password issue retry")
        const user = await User.create({ username: username, password: hash, email: email })
        res.json({ data: user, status: 201, message: "User created successfully" })

    } catch (error) {
        res.json({ error: error.message || error, status: 403, message: "Invalid username or password" })
    }
}

export const userSignController = async (req, res) => {
    try {

        const { password, email } = req.body;
        console.log(password, email)
        if (!email) {
            return new Error("Please enter your email address")
        }
        if (!password) {
            return new Error("Please enter your password")
        }

        const user = await User.findOne({ email: email })
        const comparePassword = await bcrypt.compareSync(password, user.password)
        if (comparePassword) {
            var token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY)
            const tokenOptions = {
                httpOnly: true,
                secure: true
            }


            res.cookie("token", token, tokenOptions).json({ message: "Your password is correct", data: token, message: "you are signed in" })
        }
        else {
            console.log("not a valid password")
        }
    } catch (error) {
        console.log(error)
        res.json({ error: error.message || error, status: 403, message: "Invalid username or password" })
    }

}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        return res.json({
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(403).json({ error: error.message || error, status: 403, message: "cant get your user details" })
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        return res.json({
            data: user,
            error: false,
            success: true
        })

    } catch (error) {
        console.log(error.message || error)

    }
}
export const updateUser = async (req, res) => {
    try {
        const { userId, role } = req.body
        if (!role) {
            return res.json({
                message: 'Role does not exist',
                success: false,
            })
        }
        const adminId = req.userId
        const checkIfAdmin = await User.findById(adminId)
        if (
            checkIfAdmin.role === 'Admin' || checkIfAdmin.role === 'admin'
        ) {

            const user = await User.findByIdAndUpdate(userId, { role: role })
            res.json({
                data: user,
                message: 'Update user successfully',
                success: true,
            })
        }
        else {
            res.json({
                message: 'You do not have permission to update this user',
                success: false,
            })
        }
    } catch (error) {
        console.log(error.message || error)
    }
}