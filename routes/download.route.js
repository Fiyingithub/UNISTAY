import express from "express";
import { Authenticate } from "../middlewares/authorize.middleware.js";
import downloadBusinessUpload from "../controllers/download.controller.js";


const router = express.Router();

/**
 * @swagger
 * /api/download/{businessDocumentUploadString}:
 *   get:
 *     summary: Download image by file name(protected)
 *     tags: [Download]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessDocumentUploadString
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image file to download
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.get("/:businessDocumentUploadString", Authenticate, downloadBusinessUpload);

const downloadRoutes = router;

export default downloadRoutes;
