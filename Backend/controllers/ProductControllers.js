import ProductsModel from "../models/ProductsModel.js";
import fs from 'fs'

// all products list
const listProducts = async (req, res) => {
    try {
        const products = await ProductsModel.find({})
        res.json({ success: true, data: products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// addProduct
const addProduct = async (req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.json({ success: false, message: "No file uploaded" });
        }

        let image_filename = req.file.filename;

        const product = new ProductsModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            brand: req.body.brand,
            grams: req.body.grams,
            serving: req.body.serving,
            notes: req.body.notes,
        });

        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: "Error", error: error.message });
    }
};



// removeProduct
const removeProduct = async (req, res) => {
    try {
        const product = await ProductsModel.findById(req.body.id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        fs.unlink(`uploads/${product.image}`, (err) => {
            if (err) {
                console.error("File deletion error:", err);
            }
        });

        await ProductsModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.error("Error in removeProduct:", error);
        res.json({ success: false, message: "Error", error: error.message });
    }
};


export { listProducts, addProduct, removeProduct }