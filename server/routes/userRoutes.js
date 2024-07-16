import express from 'express';
import { getAllUsers, getUser, updateUser, userSignController, userSignupController } from '../controllers/userController.js';
import { authCheck } from '../middleware/userMiddleware.js';
import { creatProductController, editProduct, filterCategory, getAllProducts, getCategory, getCategoryWiseProduct, getProductDetails, searchQuery } from '../controllers/productController.js';
import { AddToCartUser, addToCart, countAddToCartUser, deleteFromAddToCartUser, editAddToCartUser } from '../controllers/addToCart.js';
const router = express.Router()

router.post("/signup", userSignupController)
router.post("/signin", userSignController)
router.get("/get-user", authCheck, getUser)
router.get("/get-alluser", authCheck, getAllUsers)
//////////////
router.post("/update-user", authCheck, updateUser)
router.get("/search", searchQuery)
router.post("/filter-category", filterCategory)

////////////////////////////////////////////////////////
router.post("/upload-product", authCheck, creatProductController)
router.post("/edit-product", authCheck, editProduct)
router.get("/get-all-products", authCheck, getAllProducts)
router.get("/get-all-category", getCategory)
router.post("/get-all-category-products", getCategoryWiseProduct)
router.post("/get-product-details", getProductDetails)
router.post("/add-to-cart", authCheck, addToCart)
router.get("/count-add-to-cart", authCheck, countAddToCartUser)
router.get("/cart-user", authCheck, AddToCartUser)
router.post("/edit-cart-user", authCheck, editAddToCartUser)
router.post("/delete-cart-user", authCheck, deleteFromAddToCartUser)



export default router;