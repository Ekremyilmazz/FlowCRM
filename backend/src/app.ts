import express from 'express';
import { pool } from './db';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import customerRoutes from './routes/customerRoutes';
import salesRoutes from './routes/salesRoutes';
import productRoutes from './routes/productRoutes';
import salesProductRoutes from './routes/salesProductRoutes';
import communicationRoutes from './routes/communicationRoutes';
import taskRoutes from './routes/taskRoutes';
import noteRoutes from './routes/noteRoutes';
import notificationRoutes from './routes/notificationRoutes';
import activityLogRoutes from './routes/activityLogRoutes';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import adminRoutes from './routes/adminRoutes';
import refreshTokenRoutes from './routes/refreshTokenRoutes';



dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow cookies to be sent
}));


app.use('/', userRoutes);
app.use('/', customerRoutes);
app.use('/', salesRoutes);
app.use('/', productRoutes);
app.use('/', salesProductRoutes);
app.use('/', communicationRoutes);
app.use('/', taskRoutes);
app.use('/', noteRoutes);
app.use('/', notificationRoutes);
app.use('/', activityLogRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/admin', adminRoutes);
app.use('/', refreshTokenRoutes);

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.send(`Server çalışıyor. Veritabanı zamanı: ${result.rows[0].now}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} portunda çalışıyor.`);
})