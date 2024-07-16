import mongoose, { Mongoose } from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: { type: String, ref: "Product" },
    quantity: Number,
    userId: String,

}, { timestamps: true, versionKey: false })

export const Cart = mongoose.model('Cart', cartSchema);