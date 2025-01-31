import express from "express";
import { addProduct, listProducts, removeProduct } from "../controllers/ProductControllers.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const ProductRouter = express.Router();

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {  // FIXED: Added `req` as first argument
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

// Routes
ProductRouter.get("/list", listProducts);
ProductRouter.post("/add", upload.single("image"), addProduct);
ProductRouter.post("/remove", removeProduct);

export default ProductRouter;
