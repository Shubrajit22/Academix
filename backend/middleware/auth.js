import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateUser = (roles = []) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required: No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            if (!user) {
                return res.status(401).json({ message: 'Authentication failed: Invalid user.' });
            }

            req.user = { id: user.id, role: user.role };

            if (roles.length > 0 && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Authorization failed: Insufficient permissions.' });
            }

            next();

        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
        }
    };
};

export const authorizeStudent = authenticateUser(['STUDENT']);
export const authorizeTeacher = authenticateUser(['TEACHER']);
export const authorizeAdmin = authenticateUser(['ADMIN']);

// ... (other middleware like authorizeResourceOwner, authorizeTeacherForClass, etc.)