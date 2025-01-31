import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    listOrders,
    userOrders,
    placeOrderCod,
    cancelOrder,
    trackOrder,
    updateOrderStatus
} from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.get("/track", authMiddleware, trackOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", userOrders);
orderRouter.post("/placecod", authMiddleware, placeOrderCod);
orderRouter.post("/cancel", authMiddleware, cancelOrder);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;
