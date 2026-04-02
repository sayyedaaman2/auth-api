import express from 'express'


import {verifyAccessToken} from '../middlewares/authMiddleware.js'
import authRoutes from './auth.route.js'
import userRoutes from './user.route.js'

const router = express.Router();
router.use("/auth",authRoutes);
router.use("/",verifyAccessToken,userRoutes)

export default router