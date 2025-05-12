import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!file) {
        return cb(new Error("File is required"), false);
    }
    cb(null, true);
};

const singleUpload = multer({ storage, fileFilter }).single("file"); // ✅ "file" key should match frontend

export default singleUpload;
