import express from 'express';
import { isValidUser } from '../Middlewares/All.Middleware.js';
import { addRating } from '../Controllers/Product-controller.js';
import { addComments, addToCart, addToWishlist, deleteFromCart, getCartProducts, getWishlistProducts } from '../Controllers/Buyers-controller.js';

const router = express.Router();

router.patch('/add-rating',isValidUser, addRating)
router.post("/add-to-cart",addToCart)
router.delete("/delete-from-cart",deleteFromCart)
router.get("/get-cart-products",getCartProducts)
router.post("/add-to-wishlist",addToWishlist)
router.get("/get-wishlist-products",getWishlistProducts)
router.patch('/add-comments',isValidUser, addComments)

export default router;