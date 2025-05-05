import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const router = express.Router();
const client = new PrismaClient();

// Configure multer for memory storage (files will be in req.file.buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Adjusted Room Routes ---

router.get("/get-rooms/:teacher_id", async (req, res) => {
    const { teacher_id } = req.params;
    try {
        const rooms = await client.class.findMany({ // Changed from client.room to client.class
            where: {
                teacherId: parseInt(teacher_id),
            },
        });
        if (rooms.length > 0) {
            res.status(200).json(rooms);
        } else {
            res.status(204).json({ message: "No rooms found for this teacher." }); // Using 204 for no content
        }
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Failed to fetch rooms." });
    }
});

router.post("/create-class", async (req, res) => {
    const { name, teacher_id } = req.body;
    try {
        const existingRoom = await client.class.findFirst({ // Changed from client.room to client.class
            where: {
                name,
                teacherId: parseInt(teacher_id),
            },
        });
        if (existingRoom) {
            res.status(403).json({ message: "Room with this name already exists for this teacher." });
        } else {
            const room = await client.class.create({ // Changed from client.room to client.class
                data: {
                    name,
                    teacherId: parseInt(teacher_id), // Associate the creating teacher
                },
            });
            res.status(201).json({ classId: room.id, message: "Room created successfully." }); // Changed room_id to classId
        }
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Something went wrong in db" });
    }
});

// --- File Upload Route (Adjusted for Content Model) ---

router.post("/:classId/upload", upload.single("file"), async (req, res) => {
    const { classId } = req.params;
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "Please upload a file." });
    }

    try {
        const classExists = await client.class.findUnique({
            where: {
                id: parseInt(classId),
            },
        });

        if (!classExists) {
            return res.status(404).json({ message: "Class not found." });
        }

        const newContent = await client.content.create({
            data: {
                title: title || file.originalname,
                description: description || null, // description is optional now
                file: file.buffer,
                teacherId: /* Get the teacher ID from the authenticated user */ 1, // Replace with actual teacher ID
                classId: parseInt(classId), // Link content to the class
            },
        });

        res.status(201).json({
            message: "File uploaded and stored in the database successfully.",
            contentId: newContent.id,
            filename: file.originalname,
        });
    } catch (error) {
        console.error("Error uploading and storing file:", error);
        res.status(500).json({ message: "Failed to upload and store file." });
    }
});

// --- Retrieve File Content Route (Adjusted for Content Model) ---

router.get("/content/:contentId", async (req, res) => {
    const { contentId } = req.params;

    try {
        const content = await client.content.findUnique({
            where: {
                id: contentId,
            },
        });

        if (!content || !content.file) {
            return res.status(404).json({ message: "Content not found or file is empty." });
        }

        res.setHeader("Content-Disposition", `inline; filename="${content.title || 'download'}"`);
        res.setHeader("Content-Type", "application/octet-stream"); // Adjust based on actual file type

        res.send(content.file);
    } catch (error) {
        console.error("Error retrieving file content:", error);
        res.status(500).json({ message: "Failed to retrieve file content." });
    }
});



export default router;