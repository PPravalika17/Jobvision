import mongoose from "mongoose";
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
        
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true,
        min:0
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application',
        }
    ],
    resumeTemplate: String, 
      
      

},{timestamps:true});
export const Job = mongoose.model("Job",jobSchema);
/*
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
       
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
    resume: {
        type: String, // This will store the file path or URL of the uploaded resume
        required: true,
    },
    resumeTemplate: String,

}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);*/
