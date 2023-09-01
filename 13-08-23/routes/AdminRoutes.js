import express from 'express'
import { checkAdmin } from '../Middlewares/All.Middleware.js';
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnverifiedProducts, getverifiedProducts, unBlockUser, unblockProduct, verifyProduct } from '../Controllers/Admin-controller.js';

const router = express.Router();

router.patch("/block-user",checkAdmin,blockUser)
router.patch("/unblock-user",checkAdmin,unBlockUser)
router.patch("/block-product",checkAdmin,blockProduct)
router.patch("/unblock-product",checkAdmin,unblockProduct)
router.get('/get-all-buyers', checkAdmin, getAllBuyers)
router.get('/get-all-sellers', checkAdmin, getAllSellers)
router.get('/get-all-products', checkAdmin, getAllProducts)
router.patch("/verify-product",checkAdmin,verifyProduct)
router.get("/get-verify-product", checkAdmin, getverifiedProducts)
router.get("/get-unverified-product", checkAdmin, getUnverifiedProducts)
router.get("/get-blocked-product", checkAdmin, getBlockedProducts)


export default router; 