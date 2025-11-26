import express from 'express'
import {logIn, signUp } from '../controllers/user.controller.js'
const router = express.Router();

router.post("/sign", signUp)
router.post("/login", logIn)

export default router