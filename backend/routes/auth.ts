import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../types'
import { generateToken } from '../utils/authUtils'

const router = express.Router()

const BCRYPT_HASH_SALT: number = parseInt(process.env.BCRYPT_HASH_SALT || '10')

const users: User[] = []

router.post('/register', (req: Request, res: Response) => {
    try {
        const reqUser = req.body
        const newUser: User = {
            ...reqUser,
            id: 'fake-id-' + users.length + 1,
            password: bcrypt.hashSync(reqUser.password, BCRYPT_HASH_SALT)
        }
        users.push(newUser)
        console.log(`>>>User added: ${users}`)
        res.status(201).json({ status: 'success' })
    } catch (error) {
        res.status(500).json({ error: `${error}` })
    }
})

router.post('/login', (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email)
        if (!user)
            return res.status(404).json({ message: 'User not found' })
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ message: 'Wrong password' })
        console.log(`>>>User logined: ${email}`)
        res.json({ token: generateToken(user) })
    } catch (error) {
        res.status(500).json({ error: `${error}` })
    }
})

export default router;