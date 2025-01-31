import express from 'express';
import { loginUser, registerUser } from '../controllers/UserController.js';
import authMiddleware from '../middleware/auth.js';
import userModel from '../models/UserModel.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Add the profile route to fetch the logged-in user's profile
userRouter.get("/profile", authMiddleware, async (req, res) => {
    try {
        // Assuming you store user info in the user model, e.g., UserModel
        const user = await userModel.findById(req.user.id); // req.user.id is set by the authenticate middleware
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Respond with user details, e.g., email
        res.json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching user profile' });
    }
});

export default userRouter;
