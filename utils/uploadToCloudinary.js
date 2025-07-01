import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (buffer, originalname) => {
    try {
        return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
            resource_type: 'auto', // automatically detect file type
            folder: 'UNISTAY', // optional: organize in folders
            public_id: `${Date.now()}_${originalname.split('.')[0]}`, // unique filename
            transformation: [
                { width: 1200, height: 1200, crop: 'fill' }, // optional: resize large images
                { quality: 'auto' } // automatic quality optimization
            ]
            },
            (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url); // return the secure URL
            }
            }
        );
        
        // Convert buffer to stream and pipe to Cloudinary
        uploadStream.end(buffer);
        });
    } catch (error) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};
