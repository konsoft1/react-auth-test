import express, { Request, Response } from "express"
import cors from 'cors';

const app = express()
const PORT = process.env.POST || 3001

app.use(cors());

app.listen(PORT, () => {
    console.log(`Backend server is listening on port ${PORT}`)
})

app.get('/', (req: Request, res: Response) => {
    res.send('OKOK')
})

app.post('/', (req: Request, res: Response) => {
    res.json({
        user: {
            id: 'fake-id',
            username: 'jonathan',
            email: 'jonathan940108@outlook.com'
        },
        token: 'fake-token'
    })
})