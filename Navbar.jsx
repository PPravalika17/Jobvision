import { PopoverContent, Popover, PopoverTrigger } from '@radix-ui/react-popover';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, User2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile photo updated!");
      }
    } catch (error) {
      console.error("Profile photo update failed:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className='bg-black'>
      <div className='flex items-center justify-between mx-auto max-w-8xl h-16 '>
        <div>
          <h1 className='text-4xl font-bold text-white ml-10'>Job<span className='text-[#F83002]'>Vision</span></h1>
        </div>
        <div className='flex items-center gap-7'>
          <ul className='flex font-medium items-center gap-5 text-white text-1.5xl'>
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
                
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/status">Status</Link></li>
                <li><Link to="/saved-jobs">Saved Jobs</Link></li>
                <li><Link to="/roadmaps">Roadmaps</Link></li>
                <li><Link to="/resumes">Resumes</Link></li>
                
               


              </>
            )}
          </ul>
          {!user ? (
            <div className='flex items-center gap-5'>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-black hover:bg-[#6A38c2]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                className='w-80 p-4 bg-white shadow-lg rounded-lg z-50'
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                {/* Avatar + Info + Button */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Profile Image */}
                  <Avatar className="w-12 h-12 rounded-full border overflow-hidden">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </Avatar>

                  {/* Name, Bio, Button */}
                  <div className="flex flex-col gap-1">
                    <div>
                      <h4 className='font-medium text-base'>{user?.fullname}</h4>
                      <p className='text-sm text-muted-foreground'>{user?.profile.bio}</p>
                    </div>
                    <form>
                      <label
                        htmlFor="profilePhotoUpload"
                        className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition w-fit mt-1 margin-left-300"
                      >
                        Change Photo
                      </label>
                      <input
                        id="profilePhotoUpload"
                        name="profilePhoto"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        className="hidden"
                      />
                    </form>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col gap-3 text-gray-600 mt-2'>
                  {user && user.role === 'student' && (
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className='flex w-fit gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
