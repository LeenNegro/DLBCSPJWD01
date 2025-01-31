import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    grams: { type: Number, required: false },
    serving: { type: Number, required: false },
    notes: { type: String, required: false }
})

const ProductsModel = mongoose.models.product || mongoose.model("product", ProductSchema)
export default ProductsModel;