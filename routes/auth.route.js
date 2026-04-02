import {Router} from 'express';
import * as Controller from '../controllers/user.controller.js'
const router = Router();

router.post("/signup",Controller.signUp)
router.post("/login",Controller.logIn)
router.post("/logout", Controller.logout)
router.post("/refresh-token", Controller.refreshAccessToken)

export default router;