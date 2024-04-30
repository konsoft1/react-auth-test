import express, { Application, Request, Response } from "express"
import cors from 'cors';
import dotenv from "dotenv";
import authRouter from './routes/auth'
import { authenticateToken as auth } from "./middleware/authMiddleware";
import profileRouter from './routes/profile'

dotenv.config();

const app: Application = express()

app.use(cors());

const PORT: number = parseInt(process.env.PORT || '3001')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter)

app.use('/profile', auth, profileRouter)

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT}`)
})