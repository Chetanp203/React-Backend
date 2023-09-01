import express from 'express';
import { getCurrentUser, getNumber, login, register, sendOtp, verifyOtp } from '../Controllers/User-controller.js';
import { allProducts } from '../Controllers/Product-controller.js';

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/get-current-user",getCurrentUser)
router.get("/all-products", allProducts)
router.post("/get-number", getNumber)
router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp)


export default router;