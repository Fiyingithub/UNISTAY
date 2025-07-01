import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },

  //   fileFilter: (req, file, cb) => {
  //     const allowedMimeTypes = [
  //       "image/jpeg",
  //       "image/jpeg",
  //       "image/png",
  //       "image/jpg",
  //       "application/pdf",
  //       "application/pptx",
  //       "application/msword", // .doc
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  //     ];

  //     if (allowedMimeTypes.includes(file.mimetype)) {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("Only image and document files are allowed!"), false);
  //     }
  //   },

  fileFilter: (req, file, cb) => {
    cb(null, true); // Accept everything
  },
});

export default upload;
