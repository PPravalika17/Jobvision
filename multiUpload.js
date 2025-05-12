// middlewares/multiUpload.js
/*import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  cb(null, true); // Allow all file types (you can add validation)
};

const upload = multer({ storage, fileFilter });

const multiUpload = upload.fields([
  { name: "file", maxCount: 1 },          // resume
  { name: "profilePhoto", maxCount: 1 }   // profile image
]);

export default multiUpload;*/


/*
// middlewares/multiUpload.js
// middlewares/multiUpload.js
import multer from 'multer';
import path from 'path';

// Set storage engine - define where files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);  // Rename the file to avoid collisions
  }
});

// Define file filter for each type of file field
const fileFilter = (req, file, cb) => {
  // Handling student resume (PDF only)
  if (file.fieldname === 'file' && file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDF files are allowed for resume!'), false);
  }
  
  // Handling recruiter resume (PDF only)
  if (file.fieldname === 'recruiterResume' && file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDF files are allowed for recruiterResume!'), false);
  }

  // Handling profile photo (only image files allowed)
  if (file.fieldname === 'profilePhoto' && !file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed for profilePhoto!'), false);
  }

  cb(null, true); // If validation passes, allow the file
};

// Set multer options to handle multiple fields (resume, recruiter resume, profile photo)
const multiUpload = multer({ storage, fileFilter }).fields([
  { name: 'file', maxCount: 1 },         // student resume (PDF)
  { name: 'recruiterResume', maxCount: 1 }, // recruiter resume (PDF)
  { name: 'profilePhoto', maxCount: 1 }    // profile photo (image)
]);

export default multiUpload;*/


// middlewares/multiUpload.js
import multer from "multer";

// Memory storage for files
const storage = multer.memoryStorage();

// File filter: Only allow PDF files for resume
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
    // Allow only PDF files for resume
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed for the resume.'), false);
    }
  }
  
  // Allow other files (e.g., profile photo) to pass validation
  cb(null, true);
};

// Multer configuration
const upload = multer({ storage, fileFilter });

const multiUpload = upload.fields([
  { name: "file", maxCount: 1 },           // Resume (PDF)
  { name: "profilePhoto", maxCount: 1 }    // Profile photo (image)
]);

export default multiUpload;
