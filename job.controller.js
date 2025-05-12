import { Job } from "../models/job.model.js";
//import { uploadResumeTemplate } from '../middlewares/resumeTemplateMulter';
/*// Create a new job
export const postJob = async (req, res) => {
    try {
        const {
            title, description, requirements, salary, location,
            jobType, experienceLevel, position, companyId
        } = req.body;
        const userId = req.id;

        // Check if all required fields are provided
        if (!title || !description || !requirements || !salary || !location || !jobType || experienceLevel === undefined || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Validate salary and experienceLevel
        if (salary <= 0) {
            return res.status(400).json({
                message: "Salary must be a positive number",
                success: false
            });
        }

        if (experienceLevel < 0) {
            return res.status(400).json({
                message: "Experience must be a positive number or zero",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
           
        });

        return res.status(201).json({
            message: "New Job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};*/
/*export const postJob = async (req, res) => {
    try {
        const {
            title, description, requirements, salary, location,
            jobType, experienceLevel, position, company
        } = req.body;

        const userId = req.id; // From JWT

        // Validation
        if (!title || !description || !requirements || !salary || !location || !jobType || experienceLevel === undefined || !position || !company) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        if (salary <= 0) {
            return res.status(400).json({
                message: "Salary must be a positive number",
                success: false
            });
        }

        if (experienceLevel === "" || isNaN(experienceLevel)) {
            return res.status(400).json({
                message: "Experience level must be a valid number",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experienceLevel),
            position,
            company,
            created_by: company,
        });

        return res.status(201).json({
            message: "New Job created successfully",
            job,
            success: true
        });

    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};*/
//import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

export const postJob = async (req, res) => {
    try {
      console.log("File received:", req.file);
  
      let resumeURL = null;
  
      if (req.file) {
        const streamUpload = (req) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "resumeTemplates",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
  
            stream.end(req.file.buffer); // ✅ Send buffer to Cloudinary
          });
        };
  
        const result = await streamUpload(req); // ✅ Waits for Cloudinary
        console.log("Cloudinary result:", result);
        resumeURL = result.secure_url;
      }
  
      // Create job with or without resume URL
      const job = await Job.create({
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements.split(","),
        salary: Number(req.body.salary),
        location: req.body.location,
        jobType: req.body.jobType,
        experienceLevel: Number(req.body.experienceLevel),
        position: req.body.position,
        company: req.body.company,
        created_by: req.id, 
        resumeTemplate: resumeURL,
      });
  
      return res.status(201).json({ message: "Job created", job, success: true });
    } catch (error) {
      console.error("Error creating job:", error);
      return res.status(500).json({ message: "Server Error", success: false });
    }
    
  };
  

  
  






// Get all active jobs with optional keyword search
/*export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const query = {
           
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};*/

export const getAllJobs = async (req, res) => {
    try {
      const keyword = req.query.keyword?.trim();
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      let query = {};
  
      if (keyword) {
        query = {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
          ]
        };
      }
  
      const jobs = await Job.find(query)
        .populate("company")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      return res.status(200).json({
        jobs,
        success: true
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Server Error", success: false });
    }
  };
  

// Get job by ID with details
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!jobId || jobId.length !== 24) {
            return res.status(400).json({
                message: "Invalid Job ID",
                success: false
            });
        }

        const job = await Job.findById(jobId)
            .populate("applications")
            .populate("company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

// Get all jobs posted by admin
/*
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find().populate('company',"name")// lowercase field name

            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching admin's jobs:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};*/
// Fetch jobs for the admin's associated company


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        // Only fetch jobs created by this recruiter
        const jobs = await Job.find({ created_by: adminId })
            .populate('company', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching admin's jobs:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};



export const deleteJob = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedJob = await Job.findByIdAndDelete(id);
      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  


  