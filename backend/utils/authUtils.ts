import jwt from 'jsonwebtoken'
import { User } from '../types'

export const generateToken = (user: User): string => {
    console.log(`>>>`, `Generating token with Key: ${process.env.JWT_SECRET || 'secret-key2'}`)
    return jwt.sign({
        user: {
            id: user.id,
            email: user.email, 
            firstName: user.firstName,
            lastName: user.lastName
        }
    }, process.env.JWT_SECRET || 'secret-key2', {expiresIn: '1h'})
}

export const verifyToken = (token: string): User | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'secret-key2') as User;
    } catch (error) {
        return null
    }
}