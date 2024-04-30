import express, { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', (req: AuthRequest, res: Response) => {
    console.log(`>>>Profile sent: ${req.user}`)
    res.status(200).json({...req.user, token: req.token, profile: 'okok'})
})

export default router