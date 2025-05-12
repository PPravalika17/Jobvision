/*import React from 'react'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom';

const LatestJobCards = ({job}) => {
    console.log("Job Object:", job);
    console.log("Job ID:", job?._id);
  return (
    
<Link to={job?._id ? `/description/${job._id}` : "#"}> 
        
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>

    </div>
     </Link >
)
}

export default LatestJobCards*/


import React from 'react';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  console.log("Job Object:", job);
  console.log("Job ID:", job?._id);

  const companyName = job?.company?.name || "Unknown Company";
  const jobTitle = job?.title || "No Title Provided";
  const jobDescription = job?.description || "No Description Available";
  const jobPosition = job?.position || "Not Specified";
  const jobType = job?.jobType || "Not Specified";
  const jobSalary = job?.salary ? `${job.salary} LPA` : "Salary Not Specified";
  const isDeleted = job?.deleted || false;  // Check if the job is deleted
  const location = job?.location || "Location Not Available";
  // If job is deleted, render a deleted message
  if (isDeleted) {
    return (
      <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
          <h1 className='font-medium text-lg'>{companyName}</h1>
          <p className='text-sm text-gray-500'>{location}</p>
        </div>
        <div>
          <h1 className='font-bold text-lg my-2'>{jobTitle}</h1>
          <p className='text-sm text-gray-600'>{jobDescription}</p>
        </div>
        <div className='mt-4'>
          <p className='text-red-500 font-bold'>This job is no longer available.</p>
        </div>
      </div>
    );
  }

  // If the job is not deleted, render the normal job card
  return (
    <Link to={job?._id ? `/description/${job._id}` : "#"}>
      <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
          <h1 className='font-medium text-lg'>{companyName}</h1>
          <p className='text-sm text-gray-500'>{location}</p>
        </div>
        <div>
          <h1 className='font-bold text-lg my-2'>{jobTitle}</h1>
          <p className='text-sm text-gray-600'>{jobDescription}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
          <Badge className={'text-blue-700 font-bold'} variant="ghost">{jobPosition} Positions</Badge>
          <Badge className={'text-[#F83002] font-bold'} variant="ghost">{jobType}</Badge>
          <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{jobSalary}</Badge>
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCards;
