import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
import userRouter from './routes/user.routes.js';
dotenv.config()


const port = process.env.PORT || 6000
const app = express()

app.use(express.json())

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("Hello from backend")
})

app.listen(port, () => {
    console.log("Server Started")
    dbConnect();
})
