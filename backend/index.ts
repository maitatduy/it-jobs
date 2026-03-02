import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.route';
import { connectDB } from './config/database.config';

// Load biến môi trường
dotenv.config();

const app = express();
const port = 4000;

// Cấu hình cors
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // Cho phép gửi cookie
    })
);

// Kết nối database
connectDB().then(() => {
    app.listen(port, () => {
        console.log('Website đang chạy ở cổng ' + port);
    });
});

// Parse JSON body
app.use(express.json());

// Thiết lập đường dẫn
app.use('/', routes);
