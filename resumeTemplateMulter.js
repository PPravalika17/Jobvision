/*import multer from "multer";

// Configure storage (in memory for cloud uploads like Cloudinary)
const storage = multer.memoryStorage();

// File filter to accept only PDF, DOC, DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, and .docx files are allowed"));
  }
};

// Set up multer with memory storage and file validation
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Middleware to handle a single file upload for "resumeTemplate"
export const resumeTemplateUpload = upload.single("resumeTemplate");
*/
import multer from "multer";

// Configure storage (in memory for Cloudinary uploads)
const storage = multer.memoryStorage();

// File filter to accept only PDF, DOC, DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, and .docx files are allowed"));
  }
};

// Set up multer with memory storage and file validation
const upload = multer({
  storage,
  fileFilter,
  
});

// Middleware to handle a single file upload for "resumeTemplate"
export const resumeTemplateUpload = upload.single("resumeTemplate");

