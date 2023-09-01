import express from 'express';
import allRoutes from './AllRoutes'
import buyerRoutes from './BuyerRoutes';
import sellerRoutes from './SellerRoutes';
import adminRoutes from './AdminRoutes';
const router = express.Router();

router.use("/all",allRoutes)
router.use('/buyer',buyerRoutes)
router.use('/seller',sellerRoutes)
router.use('/admin',adminRoutes)


export default router;