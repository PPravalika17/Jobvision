import express from "express";
import isAunthenticated from "../middlewares/isAuthenticated.js";
import { applyJob,getAppliedJobs,getApplicants, updateStatus } from "../controllers/application.controller.js";

const router=express.Router();

router.route("/apply/:id").get(isAunthenticated,applyJob);
router.route("/get").get(isAunthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAunthenticated,getApplicants);
router.route("/status/:id/update").post(isAunthenticated,updateStatus);

export default router;