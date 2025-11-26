import express from 'express'
import adminRoutes from './admin.route.js'
import {adminOnly} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get("/profile",(req,res,next)=>{
    return res.status(200).json({
    success: true,
    user: req.user,
  });
})

router.use("/admin",adminOnly,adminRoutes)

export default router;