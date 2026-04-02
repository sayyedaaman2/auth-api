import jwt from 'jsonwebtoken';
import serverConfig from '../config/server.config.js';


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, serverConfig.JWT_SECRET)
    } catch (error) {
        throw new Error("Error while verification token")
    }
}

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, serverConfig.JWT_REFRESH_SECRET)
    } catch (error) {
        throw new Error("Error while verification token")
    }
}