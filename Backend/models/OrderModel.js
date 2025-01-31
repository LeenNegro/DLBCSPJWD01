import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                _id: { type: String, required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        amount: {
            type: Number,
            required: true,
        },
        address: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            fulladdress: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String, required: true },
        },
        payment: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['Order Processing', 'Package Preparation', 'Out for delivery', 'Delivered', 'Canceled'],
            default: 'Order Processing',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

//    date: { type: Date, default: Date.now() },


const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;