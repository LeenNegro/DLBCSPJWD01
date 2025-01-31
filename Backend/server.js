import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import ProductRouter from "./routes/ProductRoutes.js";
import userRouter from "./routes/UserRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/CartRoute.js"
import orderRouter from "./routes/OrderRoute.js"
import { fileURLToPath } from "url";
import path from "path";


// App config
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

//db connection 
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static images from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//API endPoints 
app.use("/api/user", userRouter)
app.use("/api/product", ProductRouter)
app.use("/images", express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

