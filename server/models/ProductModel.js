import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    price: Number,
    productImage: [String],
    selling: Number,
    description: String,
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema);