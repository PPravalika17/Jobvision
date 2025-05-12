import express from "express";
import isAunthenticated from "../middlewares/isAuthenticated.js";
import { resumeTemplateUpload } from "../middlewares/resumeTemplateMulter.js"; 
import { 
    getAdminJobs, 
    getAllJobs, 
    getJobById, 
    postJob, 
    deleteJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(
    isAunthenticated,
    resumeTemplateUpload,  // ✅ Add multer middleware here
    postJob
  );
router.route("/get").get(isAunthenticated, getAllJobs);
router.route("/getadminjobs").get(isAunthenticated, getAdminJobs);
router.route("/get/:id").get(isAunthenticated, getJobById);
router.route("/:id").delete(isAunthenticated, deleteJob);


export default router;
