import express from 'express'
import { login, signup } from '../controllers/user.controller.js'
import upload from '../middlewares/upload.middleware.js'
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "user-uuid-123"
 *         fullname:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phoneNumber:
 *           type: string
 *           example: "+1234567890"
 *         username:
 *           type: string
 *           example: "johndoe123"
 *         role:
 *           type: string
 *           enum: [STUDENT, LANDLORD, USER]
 *           example: "STUDENT"
 *         businessName:
 *           type: string
 *           example: "Doe Real Estate"
 *         businessDocumentUploadString:
 *           type: string
 *           example: "https://cloudinary.com/image.jpg"
 *         university:
 *           type: string
 *           example: "University of Lagos"
 *         matricNumber:
 *           type: string
 *           example: "UL/2020/CSC/001"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00.000Z"
 *     UserRegistration:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - phoneNumber
 *         - username
 *         - password
 *         - role
 *       properties:
 *         fullname:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phoneNumber:
 *           type: string
 *           example: "+1234567890"
 *         username:
 *           type: string
 *           example: "johndoe123"
 *         password:
 *           type: string
 *           format: password
 *           example: "SecurePassword123!"
 *         role:
 *           type: string
 *           enum: [STUDENT, LANDLORD, USER]
 *           example: "STUDENT"
 *         businessName:
 *           type: string
 *           example: "Doe Real Estate"
 *         businessDocumentUploadString:
 *           type: string
 *           example: "base64encodedstring"
 *         university:
 *           type: string
 *           example: "University of Lagos"
 *         matricNumber:
 *           type: string
 *           example: "UL/2020/CSC/001"
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "SecurePassword123!"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 201
 *         error:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "User registered successfully"
 *         data:
 *           type: object
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         error:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "User already exist"
 *   responses:
 *     UserAlreadyExists:
 *       description: User with this email already exists
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     ValidationError:
 *       description: Validation error for required fields
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */

// REGISTER a new user
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with role-specific fields (student, landlord, or general user)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - phoneNumber
 *               - username
 *               - password
 *               - role
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               username:
 *                 type: string
 *                 example: "johndoe123"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePassword123!"
 *               role:
 *                 type: string
 *                 enum: [STUDENT, LANDLORD, USER]
 *                 example: "STUDENT"
 *               businessName:
 *                 type: string
 *                 description: "Required for LANDLORD role"
 *                 example: "Doe Real Estate"
 *               businessDocumentUploadString:
 *                 type: string
 *                 description: "For LANDLORD role"
 *                 example: "base64encodedstring"
 *               university:
 *                 type: string
 *                 description: "Required for STUDENT role"
 *                 example: "University of Lagos"
 *               matricNumber:
 *                 type: string
 *                 description: "Required for STUDENT role"
 *                 example: "UL/2020/CSC/001"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Optional profile image"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - User already exists or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               userExists:
 *                 summary: User already exists
 *                 value:
 *                   status: 400
 *                   error: true
 *                   message: "User already exist"
 *               landlordValidation:
 *                 summary: Landlord fields missing
 *                 value:
 *                   status: 400
 *                   error: true
 *                   message: "All landlord fields are required"
 *               studentValidation:
 *                 summary: Student fields missing
 *                 value:
 *                   status: 400
 *                   error: true
 *                   message: "All Student fields are required"
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.post('/signup', upload.single('filename'), signup)

/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePassword123!"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidCredentials:
 *                 summary: Invalid email or password
 *                 value:
 *                   status: 400
 *                   error: true
 *                   message: "Invalid email or password"
 *               userNotFound:
 *                 summary: User not found
 *                 value:
 *                   status: 400
 *                   error: true
 *                   message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/signin', login);

const userRoute = router

export default userRoute