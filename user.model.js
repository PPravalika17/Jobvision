import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50, 
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_]+$/.test(v); 
            },
            message: "Username can only contain letters, numbers, and underscores.",
        },
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    phoneNumber:{
        type:Number,
        required:true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Ensures exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }

    },
    password:{
        type:String,
        required:true,
        /*validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }*/
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile: {
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOrginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }

    }

},{timestamp:true});
export const User=mongoose.model('User',userSchema);