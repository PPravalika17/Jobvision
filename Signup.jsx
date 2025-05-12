import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner'
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

 /* const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(input.phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      return;
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input.password)) {
      setError("Password must be at least 8 characters long, with an uppercase letter, lowercase letter, number, and special character.");
      return;
  } 
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
       });
       if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
       }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
          dispatch(setLoading(false));
        }
    };*/
    const submitHandler = async (e) => {
      e.preventDefault();
      setError("");
    
      if (!/^\d{10}$/.test(input.phoneNumber)) {
        setError("Phone number must be exactly 10 digits.");
        return;
      }
    
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input.password)) {
        setError("Password must be at least 8 characters long, with an uppercase letter, lowercase letter, number, and special character.");
        return;
      }
    
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }
    
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
        });
    
        if (res.data.success) {
          navigate("/login");
          toast.success(res.data.message);
        }
    
      } catch (error) {
        console.log(error);
    
        // ✅ FIXED ERROR HANDLING:
        const errMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        setError(errMsg);         // show below heading
        toast.error(errMsg);      // show toast notification
      } finally {
        dispatch(setLoading(false));
      }
    };
    
    return (
      <div>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
          <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Signup</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className='my-4 space-y-2'>
              <Label>Full Name</Label>
              <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Enter name" />
            </div>

            <div className='my-4 space-y-2'>
              <Label>Email</Label>
              <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter mail" />
            </div>

            <div className='my-4 space-y-2'>
              <Label>Phone Number</Label>
              <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Enter number" />
            </div>

            <div className='my-4 space-y-2'>
              <Label>Password</Label>
              <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter password" />
            </div>

            <div className='flex items-center justify-between'>

              <RadioGroup className="flex items-center gap-4 my-5 ">
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />
                  <Label htmlFor="option-one">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" checked={input.role === 'recruiter'} onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
                  <Label htmlFor="option-two">Recruiter</Label>
                </div>
              </RadioGroup>
              <div className='flex items-center gap-2'>
                <Label>Profile</Label>
                <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
              </div>
            </div>
            {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait </Button>:<Button type="submit" className='w-full my-4'>SignUP</Button>
          }
            <span className='justify-center'>Already have an account? <Link to="/login" className='text-blue-600 '>Login</Link></span>
          </form>
        </div>
      </div>
    )
  }

  export default Signup