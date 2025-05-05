import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET_STUDENT = process.env.JWT_SECRET_STUDENT || 'default-student-secret';
const JWT_SECRET_TEACHER = process.env.JWT_SECRET_TEACHER || 'default-teacher-secret';
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN || 'default-admin-secret';

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({ message: 'User doesnt exists' });
    }
  
    
    else{
        let token;
        const id = existingUser.id
        if (role === 'STUDENT') {
          token = jwt.sign({ name,id }, JWT_SECRET_STUDENT);
        } else if (role === 'TEACHER') {
          token = jwt.sign({ name,id }, JWT_SECRET_TEACHER);
        } else {
          token = jwt.sign({ name,id }, JWT_SECRET_ADMIN);
        }
    
        res.status(201).send({
          user,
          token,
        });
      }
    }
    catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;