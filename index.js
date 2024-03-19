import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from "./routes/user_route.js";
import authRoute from './routes/auth.route.js'
import router from "./routes/auth.route.js";

dotenv.config()

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("Connected to MongoDb")
}).catch((err) =>{
    console.log(err)
})

const app = express()

app.use(express.json())
app.use(router)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})