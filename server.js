import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connection.js";
import authRouter from './src/modules/auth/auth.routes.js';
import categoryRouter from './src/modules/category/category.routes.js'
import taskRouter from './src/modules/task/task.routes.js'
import cors from 'cors'

dotenv.config();
const app = express();
const port = process.env.PORT;

// connect to DB
await connectDB();

app.use(cors())

// parsing
app.use(express.json());

// routers
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/task', taskRouter);

// global error handler
app.use((error, req, res, next) => {
    const statusCode = error.cause || 500;
    return res.status(statusCode).json({
        success: false,
        message: error.message,
        stack: error.stack,
    });
});

app.listen(port, () => console.log(` app listening on port ${port}!`));
