/*import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal,Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//import { setSearchCompanyByText } from '@/redux/companySlice'
const AdminJobsTable = () => {
   const navigate=useNavigate();
    //const { companies, searchCompanyByText } = useSelector(store => store.company);
    const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
    const [filterJobs,setFilterJobs]=useState(allAdminJobs);
    /*const handleDelete = async (jobId) => {
      try {
          console.log(`Deleting job with ID: ${jobId}`); // Ensure the correct ID is being passed
          const response = await axios.delete(`/api/jobs/${jobId}`);
          console.log(response.data); // Check the response
          // Optionally, update state to remove the deleted job from the UI
      } catch (error) {
          console.error("Failed to delete job:", error);
      }
  };
    
    useEffect(()=>{
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())|| job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs );
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Compny Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr>
                               
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                       
                                            <div onClick={()=> navigate("/admin/jobs/create")} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable ;*/



/*import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/job/${jobId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Update job status in state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      setError('Error updating job status');
    }
  };
  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Do you really want to delete?");
    if (!confirm) return;
  
    try {
        await axios.delete(`http://localhost:8000/api/jobs/${jobId}`);

      const response = await axios.delete(`http://localhost:5000/api/jobs/${jobId}`); // Use your backend port
      console.log("Deleted:", response.data);
  
      // Update the UI
      setFilterJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  useEffect(() => {
    const filteredJobs = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate("/admin/jobs/create")} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                        <Eye className='w-4' />
                        <span>Applicants</span>
                      </div>
                      <div onClick={() => handleDelete(job._id)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-500'>
                        <Trash2 className='w-4' />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;



*/

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [jobs, setJobs] = useState(allAdminJobs); // Managing the jobs state
const [error, setError] = useState(null); // Managing the error state
const [searchDate, setSearchDate] = useState('');

  // Handle Status Change
 /* const handleStatusChange = async (jobId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/job/${jobId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      // Update job status in state
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.error('Error updating job status', err);
      setError('Error updating job status');
    }
  };
  */

  // Handle Delete
  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Do you really want to delete?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/job/${jobId}`, { withCredentials: true });
      // Update the UI after successful deletion
      setFilterJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };
  


  // Filter jobs based on search
  useEffect(() => {
    if (!allAdminJobs) return;

    const filteredJobs = allAdminJobs.filter((job) => {
      const jobDate = job?.createdAt.split("T")[0];
      const matchesText = !searchJobByText || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
      const matchesDate = !searchDate || jobDate === searchDate;

      return matchesText && matchesDate;
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText, searchDate]);


  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-250">
      <Table>
        <TableCaption>A list of your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
           
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Resume</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
               
               <TableCell>
  {job.resumeTemplate ? (
    <a
      href={job.resumeTemplate} // This is the Cloudinary URL
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View Resume
    </a>
  ) : (
    <span className="text-gray-400">Not uploaded</span>
  )}
</TableCell>






                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate("/admin/jobs/create")} className='flex items-center gap-2 w-fit cursor-pointer'>
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                        <Eye className='w-4' />
                        <span>Applicants</span>
                      </div>
                      <div onClick={() => handleDelete(job._id)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 text-black-500'>
                        <Trash2 className='w-4' />
                        <span>Delete</span>
                      </div>
                     
                      
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
