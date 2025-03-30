import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import dotenv from 'dotenv';

import studentRoute from './routes/student.js';
import teacherRoute from './routes/teacher.js';
import authRoute from './routes/signin.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);
app.use('/signin', authRoute);

// Start server
app.listen(3000, () => {
    console.log(`🚀 Server is running on port 3000`);
});
