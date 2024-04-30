import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/authUtils";
import { User } from "../types";

export interface AuthRequest extends Request {
    user?: User
    token?: string
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' })
    const user = verifyToken(token)
    if (!user)
        return res.status(403).json({ message: 'Invalid token' })
    req.user = user
    req.token = token
    next()
}