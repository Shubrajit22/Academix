import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from "dotenv"
const router = express.Router();
const prisma = new PrismaClient();
dotenv.config();
router.post("/", async (req, res) => {
  try {
    const { name, email, password, branch, dept, roll ,role} = req.body;

    // console.log(password)
    // const saltRounds = 10
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        roll,
        branch,
        dept,
        role
      },
    });

    console.log("User Created:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
