import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateUser, authorizeStudent } from '../middleware/auth'; // Ensure authorizeStudent exists

const router = express.Router();
const client = new PrismaClient();

// POST /api/student/join-class
// Allows a student to join a class
router.post('/join-class', authorizeStudent, async (req, res) => { // Use authorizeStudent
    const { classId } = req.body;
    const studentId = req.user.id;

    if (!classId) {
        return res.status(400).json({ message: 'Class ID is required.' });
    }

    try {
        const classToJoin = await client.class.findUnique({
            where: { id: parseInt(classId) },
        });

        if (!classToJoin) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        // Check if the student is already enrolled
        const existingEnrollment = await client.class.findFirst({
            where: {
                studentId: studentId,
                id: parseInt(classId),
            },
        });

        if (existingEnrollment) {
            return res.status(409).json({ message: 'You are already enrolled in this class.' });
        }

        const enrollment = await client.class.update({ // Use update to add student to the class's student relation
            where: { id: parseInt(classId) },
            data: {
                classesAsStudent: {
                    connect: { id: studentId },
                },
            },
        });

        res.status(200).json({ message: 'Successfully joined the class.', classId: enrollment.id });

    } catch (error) {
        console.error('Error joining class:', error);
        res.status(500).json({ message: 'Failed to join the class.' });
    }
});

// GET /api/student/get-classes
// Retrieves a list of classes the logged-in student is enrolled in
router.get('/get-classes', authorizeStudent, async (req, res) => { // Use authorizeStudent
    const studentId = req.user.id;

    try {
        const classes = await client.user.findUnique({
            where: { id: studentId },
            include: {
                classesAsStudent: {
                    include: {
                        teacher: {
                            select: { id: true, name: true, email: true },
                        },
                        contents: {
                            select: { id: true, title: true, description: true, createdAt: true },
                        },
                    },
                },
            },
        });

        if (!classes) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json(classes.classesAsStudent);

    } catch (error) {
        console.error('Error getting student classes:', error);
        res.status(500).json({ message: 'Failed to retrieve student classes.' });
    }
});

// GET /api/student/classes/:classId/contents
// Retrieves the contents for a specific class the logged-in student is enrolled in
router.get('/classes/:classId/contents', authorizeStudent, async (req, res) => { // Use authorizeStudent
    const { classId } = req.params;
    const studentId = req.user.id;

    try {
        const enrollment = await client.class.findFirst({
            where: {
                id: parseInt(classId),
                studentId: studentId,
            },
            include: {
                contents: {
                    select: { id: true, title: true, description: true, createdAt: true, teacherId: true },
                    include: {
                        teacher: {
                            select: { id: true, name: true },
                        }
                    }
                },
            },
        });

        if (!enrollment) {
            return res.status(404).json({ message: 'Class not found or you are not enrolled.' });
        }

        res.status(200).json(enrollment.contents);

    } catch (error) {
        console.error('Error getting class contents for student:', error);
        res.status(500).json({ message: 'Failed to retrieve class contents.' });
    }
});

export default router;