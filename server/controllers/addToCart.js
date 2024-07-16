import { Cart } from "../models/addToCart.js"
import { User } from "../models/userSchema.js"
import { ObjectId } from 'mongodb'
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body
        const adderId = req.userId
        const isExist = await Cart.findOne({ productId })
        console.log(isExist)
        if (isExist && isExist.userId == adderId) {
            return res.json({
                message: 'Product already exists',
                success: true,
                error: false
            })

        }
        const cart = await Cart({ productId: productId, userId: adderId, quantity: 1 })
        await cart.save()

        return res.json({
            data: cart,
            message: 'Product added successfully',
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message, success: false, message: error.message, })
    }
}
export const countAddToCartUser = async (req, res) => {
    try {
        const userId = req.userId

        const count = (await Cart.find({ userId: userId })).length
        console.log(count)


        res.json({ data: count, success: true, error: false, message: "count of your cart is" })
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message, success: false, message: error.message, })
    }
}

export const AddToCartUser = async (req, res) => {
    try {
        const userId = req.userId

        const data = await Cart.find({ userId: userId }).populate("productId")



        res.json({ data: data, success: true, error: false, message: "count of your cart is" })
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message, success: false, message: error.message, })
    }
}
export const editAddToCartUser = async (req, res) => {
    try {
        const userId = req.userId
        const productId = req.body._id
        const qty = req.body.quantity
        const data = await Cart.updateOne({ _id: productId }, {
            ...(qty && { quantity: qty })
        })

        res.json({
            data: data,
            success: true,
            error: false,
            message: "Product updated"
        })
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message, success: false, message: error.message, })
    }
}

export const deleteFromAddToCartUser = async (req, res) => {
    try {
        const userId = req.userId
        const productId = req.body._id
        const qty = req.body.quantity
        const data = await Cart.deleteOne({ _id: productId })

        res.json({
            data: data,
            success: true,
            error: false,
            message: "Product updated"
        })
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message, success: false, message: error.message, })
    }
}

