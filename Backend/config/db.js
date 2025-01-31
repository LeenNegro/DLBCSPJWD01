import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://leennegro:adminnegro2025@cluster0.wkczz.mongodb.net/GFT-CODE',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("DB Connected to MongoDB Atlas");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    }
};



//mongodb+srv://leennegro:adminnegro2025@cluster0.wkczz.mongodb.net/GFT-CODE
