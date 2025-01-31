import express from 'express'; // Import express
import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import authMiddleware from '../middleware/auth.js';
import mongoose from 'mongoose';
// Initialize router
const router = express.Router();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Placing User Order for Frontend using Cash On Delivery (COD)
const placeOrderCod = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, items, amount, address } = req.body;
        console.log(userId);

        // Convert _id to ObjectId only if valid, otherwise store as a string
        const formattedItems = items.map(item => ({
            ...item,
            _id: isValidObjectId(item._id) ? new mongoose.Types.ObjectId(item._id) : item._id
        }));

        const newOrder = new orderModel({
            userId: isValidObjectId(userId) ? new mongoose.Types.ObjectId(userId) : userId,
            items: formattedItems,
            amount,
            address,
            payment: false,
            status: "Order Processing",
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully with COD" });
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: "Error in placing order" });
    }
};


// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    console.log(req.body);
    console.log(req.body.userId);
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// Cancel Order
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.status === 'canceled') {
            return res.status(400).json({ success: false, message: 'Order is already canceled' });
        }

        order.status = 'canceled';
        await order.save();

        res.json({ success: true, message: 'Order has been canceled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in canceling the order" });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ success: true, message: 'Order status updated', data: order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error updating order status' });
    }
};

// Track Order for a specific user
const trackOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await orderModel.find({ userId }).populate('userId', 'email'); // Populate userId with email

        if (!orders.length) {
            return res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error fetching order details.' });
    }
};

// Get User Orders 
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ userId }).populate('userId', 'email'); // Populate userId with email
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

// Defining Routes
router.get('/list', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({ user: userId }).populate('userId', 'email').sort({ createdAt: -1 });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching orders' });
    }
});

// Exporting the router
export { router, listOrders, userOrders, placeOrderCod, cancelOrder, updateOrderStatus, trackOrder, getUserOrders };
