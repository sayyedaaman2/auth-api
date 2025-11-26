import express from 'express'

import {logIn, signUp } from '../controllers/user.controller.js'

import {protectedRoute} from '../middlewares/authMiddleware.js'

import userRoutes from './user.route.js'

const router = express.Router();
router.post("/sign", signUp)
router.post("/login", logIn)
router.use("/",protectedRoute,userRoutes)

export default router