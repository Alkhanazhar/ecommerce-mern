import { checkAdmin } from "../middleware/checkAdmin.js";
import { Product } from "../models/ProductModel.js";

export const creatProductController = async (req, res) => {
    try {
        const sessionId = req.userId
        const isAdmin = await checkAdmin(sessionId)
        console.log(isAdmin)
        if (isAdmin) {
            const product = await Product.create(req.body)
            res.status(200).json({
                message: "Product created successfully",
                status: true,
                error: false,
            })
        }
        else {
            res.status(200).json({
                message: "Not an admin",
                status: false,
                error: true,
            })
        }

    } catch (error) {
        console.log(error.message);
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json({
            data: products,
            success: true,
            message: "Product fetch successfully"
        })
    } catch (error) {
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,

        })
    }
}
export const editProduct = async (req, res) => {
    try {
        const sessionId = req.userId
        const { _id, ...resData } = req.body
        const isAdmin = await checkAdmin(sessionId)
        console.log(isAdmin)
        if (isAdmin) {
            const product = await Product.findByIdAndUpdate(_id, resData)
            res.status(200).json({
                data: product,
                message: "Product Edited successfully",
                status: true,
                error: false,
            })
        }

    } catch (error) {
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        const productCategory = await Product.distinct("category")
        const categoryArr = []
        for (let category of productCategory) {
            const singleCategory = await Product.findOne({ category: category })
            if (singleCategory) categoryArr.push(singleCategory)
        }
        res.status(200).json({
            data: categoryArr,
            message: "category fetched successfully",
            status: false,
            error: true,
        })

    } catch (error) {
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}

export const getCategoryProductOne = async (req, res) => {
    try {

    } catch (error) {
        console.error(error.message)
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}
export const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req?.body || req?.query
        const product = await Product.find({ category })
        res.json({ data: product, status: true, error: false })

    } catch (error) {
        console.error(error.message)
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })

    }
}

export const getProductDetails = async (req, res) => {
    try {
        const { _id } = req.body
        console.log(_id, req.body)
        const product = await Product.findById(_id)
        res.json({ data: product, status: true, error: false })

    } catch (error) {
        console.error(error.message)
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}

export const searchQuery = async (req, res) => {
    try {
        const { q } = req.query
        console.log(q)
        const regex = new RegExp(q, 'i', 'g')
        const products = await Product.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        })
        // const product = await Product.findById(_id)
        res.json({ data: products, status: true, error: false, message: " search results" })

    } catch (error) {
        console.error(error.message)
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}

export const filterCategory = async (req, res) => {
    try {
        const { category } = req.body || []

        const products = await Product.find({
            category: {
                "$in": category
            }
        })
        res.json({ data: products, status: true, error: false, message: " search results" })

    } catch (error) {
        console.error(error.message)
        res.status(403).json({
            message: error.message,
            status: false,
            error: true,
        })
    }
}