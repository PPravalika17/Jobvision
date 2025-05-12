import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/clodinary.js";
//import getDataUri from "./utils"
//import cloudinary from "./utils/cloudinary.js";

export const register = async (req,res) => {
    try{
        const {fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password ||!role ){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };
        console.log("Received file:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "File upload is required.", success: false });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User already exist with this mail',
                success:false,
            })
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
        }
        
        const existingUser = await User.findOne({ fullname });
        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists. Please choose another.",
                success: false
            });
        }

        // ✅ Validate fullname (only letters, numbers, and underscores)
        if (!/^[a-zA-Z0-9_]+$/.test(fullname)) {
            return res.status(400).json({
                message: "Username can only contain letters, numbers, and underscores.",
                success: false
            });
        }

        // Validate password (at least 8 characters, with upper, lower, number, and special character)
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message:"Account created Successfully.",
            success:true
        });
    }catch(error){
        console.log(error);
    }

}
/*
export const login =async (req,res) => {
    try{
        const{email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            });     
        };
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false,
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false,
            })
        };


        if(role != user.role){
            return res.status(400).json({
                message:"Account doesnt exist with current role.",
                success:false
            })
        };

const tokenData = {
    userId:user._id
}
const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
user={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile
}

return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
    message:`Welcome Back ${user.fullname}`,
    user,
    success:true
})

    }catch(error){
        console.log(error);
    }
}*/

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    });

    const { _id, fullname, phoneNumber, profile } = user;

    // Update cookie handling here
    return res.status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration time (1 day)
        httpOnly: true,                // Prevents client-side access to the cookie
        sameSite: 'strict',            // Restrict cookies to same-site requests only
        secure: process.env.NODE_ENV === 'production' // Ensure cookies are only sent over HTTPS in production
      })
      .json({
        message: `Welcome Back ${fullname}`,
        user: { _id, fullname, email, phoneNumber, role, profile },
        success: true
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};



export const logout =async (req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
            
    }
    catch(error){
        console.log(error);
    }
}

/*export const updateProfile=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills,password}=req.body;
        const file=req.file;
        //if(!fullname || !email || !phoneNumber || !bio ||!skills ){
           // return res.status(400).json({
             //   message:"Something is missing",
             //   success:false,
          //  }); 
       // };

       const fileUri = getDataUri(file);
       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      let skillsArray;
      if(skills){
        skillsArray=skills.split(",");
      }
       
        const userId=req.id;//middleware
        let user=await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found.",
                success:false
            })
                
        }
        if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be exactly 10 digits.",
                success: false
            });
        }

        // Validate password if it's being updated
        if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
                success: false
            });
        }
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname 
        }
        if (file) {
            console.log("Received file:", file); // ✅ DEBUG
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }


        await user.save();

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
}*/
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from URL parameters

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: "User deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, bio, skills, password } = req.body;
  
      const userId = req.id; // From auth middleware
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          message: "User not found.",
          success: false,
        });
      }
  
      // Validate phone number
      if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({
          message: "Phone number must be exactly 10 digits.",
          success: false,
        });
      }
  
      // Validate password if being updated
      if (
        password &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
      ) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
          success: false,
        });
      }
  
      // Update fields
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skills.split(",");
  /*
      const resumeFile = req.files?.file?.[0];
      if (resumeFile) {
        const fileUri = getDataUri(resumeFile);
        const uploadedResume = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: "raw",
          folder: "resumes",
        });
        user.profile.resume = uploadedResume.secure_url;
        user.profile.resumeOriginalName = resumeFile.originalname;
      }
  */
      const resumeFile = req.files?.file?.[0];
      if (resumeFile) {
          // Check if the file is a PDF before proceeding
          if (resumeFile.mimetype !== 'application/pdf') {
              return res.status(400).json({
                  message: 'Only PDF files are allowed for the resume.',
                  success: false,
              });
          }

          const fileUri = getDataUri(resumeFile); // Convert file to base64
          const uploadedResume = await cloudinary.uploader.upload(fileUri.content, {
              resource_type: "image", // Since it's a PDF, treat it as raw
             
          });

          // Save resume URL and original file name
          user.profile.resume = uploadedResume.secure_url;
          user.profile.resumeOriginalName = resumeFile.originalname;
      }


      // ✅ Handle profile photo upload (for navbar)
      const profileImageFile = req.files?.profilePhoto?.[0];
      if (profileImageFile) {
        const fileUri = getDataUri(profileImageFile);
        const uploadedPhoto = await cloudinary.uploader.upload(fileUri.content, {
          folder: "profilePhotos",
        });
        user.profile.profilePhoto = uploadedPhoto.secure_url;
      }
  
      await user.save();
  
      return res.status(200).json({
        message: "Profile updated successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        success: true,
      });
    } catch (error) {
      console.log("Error in updateProfile:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  
