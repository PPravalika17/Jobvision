/*import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
      setIsSaved(savedJobs.includes(job?._id));
    }, [job?._id]);
    
    const daysAgoFunction = (mongodbTime) => {
      const createdAt = new Date(mongodbTime);
      const currentTime = new Date();
      const timeDifference = currentTime - createdAt;
      return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };
  /*  const handleSaveJob = () => {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    
      let updatedJobs;
      if (savedJobs.includes(job._id)) {
        // Unsave the job
        updatedJobs = savedJobs.filter(id => id !== job._id);
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        setIsSaved(false);
        toast.success("Removed from saved jobs");
      } else {
        // Save the job
        updatedJobs = [...savedJobs, job._id];
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        setIsSaved(true);
        toast.success("Job saved for later");
      }
    };

const handleSaveJob = () => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

  let updatedJobs;
  if (savedJobs.includes(job._id)) {
    // Unsave the job
    updatedJobs = savedJobs.filter(id => id !== job._id);
    toast.success("Removed from saved jobs");
  } else {
    // Save the job
    updatedJobs = [...savedJobs, job._id];
    toast.success("Job saved for later");
  }

  localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
  setIsSaved(updatedJobs.includes(job._id)); // force state sync
};

  // SavedJobs.jsx

const fetchSavedJobs = async () => {
  const savedJobIds = JSON.parse(localStorage.getItem('savedJobs')) || [];
  const validJobs = [];

  const filteredIds = [...savedJobIds]; // we'll modify this if needed

  for (const id of savedJobIds) {
    try {
      const res = await axios.get(`/api/v1/job/get/${id}`);
      validJobs.push(res.data.job);
    } catch (err) {
      console.warn(`Job with id ${id} not found, removing from saved list`);
      const index = filteredIds.indexOf(id);
      if (index !== -1) filteredIds.splice(index, 1);
    }
  }

  localStorage.setItem('savedJobs', JSON.stringify(filteredIds));
  setJobs(validJobs);
};

    const location = job?.location || "Location not available"; // Fixed to pull location from job object directly
  
    return (
      <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>
            {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <Button
  onClick={handleSaveJob}
  variant="outline"
  className={`rounded-full ${isSaved ? 'bg-yellow-100' : ''}`}
  size="icon"
>
  <Bookmark
    className={isSaved ? 'text-yellow-500 fill-yellow-500' : ''}
  />
</Button>

        </div>
  
        <div className='flex items-center gap-2 my-2'>
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>{location}</p> {/* Corrected location }
          </div>
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
        <div className='flex items-center gap-4 mt-4'>
          <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
          <Button onClick={handleSaveJob} className="bg-[#7209b7]">
  {isSaved ? "Unsave" : "Save For Later"}
</Button>

        </div>
      </div>
    );
  }
  
  export default Job;*/
/*
  import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';  // assuming axios is used for API calls

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  /*useEffect(() => {
    // Load saved jobs from localStorage and check if the current job is saved
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setIsSaved(savedJobs.includes(job?._id));
  }, [job?._id]);*/
/*useEffect(() => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  const validJobs = savedJobs.filter(id => job?._id !== id);
 
  // If the job is not valid (it was deleted or doesn't exist), update localStorage
  if (validJobs.length !== savedJobs.length) {
    localStorage.setItem('savedJobs', JSON.stringify(validJobs));
    toast.error("This job was deleted and removed from your saved jobs.");
  }
 
  setIsSaved(validJobs.includes(job?._id));
}, [job?._id]);
useEffect(() => {
  const validateJob = async () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
 
    try {
      // Check if the job still exists
      const res = await axios.get(`/api/v1/job/get/${job?._id}`);
      const exists = res.data?.job !== undefined;
      setIsSaved(savedJobs.includes(job?._id));
    } catch (err) {
      // If job no longer exists
      const updatedJobs = savedJobs.filter(id => id !== job?._id);
      localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
      toast.error("This job was deleted and removed from your saved jobs.");
      setIsSaved(false);
    }
  };
 
  if (job?._id) {
    validateJob();
  }
}, [job?._id]);
 
 

const daysAgoFunction = (mongodbTime) => {
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDifference = currentTime - createdAt;
  return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
};

// Handle saving/un-saving the job
const handleSaveJob = () => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  let updatedJobs;
  
  if (savedJobs.includes(job._id)) {
    // Unsave the job
    updatedJobs = savedJobs.filter(id => id !== job._id);
    toast.success("Removed from saved jobs");
  } else {
    // Save the job
    updatedJobs = [...savedJobs, job._id];
    toast.success("Job saved for later");
  }

  // Update saved jobs in localStorage
  localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));

  // Force state sync after updating localStorage
  setIsSaved(updatedJobs.includes(job._id));
};

// Handle job data if job is not available or deleted
if (!job) {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <p className='text-center text-gray-500'>
        This job is no longer available.
      </p>
    </div>
  );
}

const location = job?.location || "Location not available";
 
const fetchSavedJobs = async () => {
  const savedJobIds = JSON.parse(localStorage.getItem('savedJobs')) || [];
  const validJobs = [];
 
  for (const id of savedJobIds) {
    try {
      const res = await axios.get(`/api/v1/job/get/${id}`);
      validJobs.push(res.data.job);  // Add valid jobs to the list
    } catch (err) {
      console.warn(`Job with id ${id} not found, removing from saved list`);
      // If job is not found, remove from saved list in localStorage
      const updatedSavedJobs = savedJobIds.filter(jobId => jobId !== id);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    }
  }
 
  return validJobs;
};

return (
  <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
    <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>
        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
      </p>
      <Button
        onClick={handleSaveJob}
        variant="outline"
        className={`rounded-full ${isSaved ? 'bg-yellow-100' : ''}`}
        size="icon"
      >
        <Bookmark
          className={isSaved ? 'text-yellow-500 fill-yellow-500' : ''}
        />
      </Button>
    </div>

    <div className='flex items-center gap-2 my-2'>
      <Button className="p-6" variant="outline" size="icon">
        <Avatar>
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
      </Button>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{location}</p> {/* Corrected location }
      </div>
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
    <div className='flex items-center gap-4 mt-4'>
      <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
      <Button onClick={handleSaveJob} className="bg-[#7209b7]">
        {isSaved ? "Unsave" : "Save For Later"}
      </Button>
    </div>
  </div>
);
};

export default Job;*/
/*
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isValidJob, setIsValidJob] = useState(true); 

  /*useEffect(() => {
    const checkJobValidity = async () => {
      if (!job?._id) return;

      try {
        await axios.get(`/api/v1/job/get/${job._id}`);
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setIsSaved(savedJobs.includes(job._id));
        setIsValidJob(true);
      } catch (error) {
        // If job not found
        if (error.response?.status === 404) {
          const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
          const updatedJobs = savedJobs.filter(id => id !== job._id);
          localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
          toast.error("This job was deleted and removed from your saved jobs.");
          setIsValidJob(false); // 👈 hide job card
        }
      }
    };

    checkJobValidity();
  }, [job?._id]);*/
/*
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setIsSaved(savedJobs.includes(job._id));
  }, [job?._id]);
  
  const handleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    let updatedJobs;

    if (savedJobs.includes(job._id)) {
      updatedJobs = savedJobs.filter(id => id !== job._id);
      toast.success("Removed from saved jobs");
    } else {
      updatedJobs = [...savedJobs, job._id];
      toast.success("Job saved for later");
    }

    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    setIsSaved(updatedJobs.includes(job._id));
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  // ✅ If job is invalid, return nothing
 // if (!isValidJob) return null;

  const location = job?.location || "Location not available";
  const handleDownload = (fileUrl) => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = fileUrl; // Set the href to the file URL
    link.setAttribute("download", "resumeTemplate"); // Set the download attribute with a default file name
  
    // Temporarily append the link to the DOM
    document.body.appendChild(link);
  
    // Use window.open to open the file in a new tab
    const newTab = window.open(link.href, "_blank");
  
    // Check if the file is opening in a new tab, then trigger the download
    if (newTab) {
      link.click(); // Trigger the download
    } else {
      // If the new tab didn't open, download directly
      link.click();
    }
  
    // Clean up by removing the link from the DOM
    document.body.removeChild(link);
  };
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 w-80'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          onClick={handleSaveJob}
          variant="outline"
          className={`rounded-full ${isSaved ? 'bg-yellow-100' : ''}`}
          size="icon"
        >
          <Bookmark className={isSaved ? 'text-yellow-500 fill-yellow-500' : ''} />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{location}</p>
        </div>
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
      <Button
  onClick={() => {
    // Create an invisible <a> element
    const link = document.createElement('a');
    link.href = job?.resumeTemplate;  // The resume URL
    link.target = "_blank";  // Open it in a new tab if required (not needed for download)
    link.download = job?.title + "_resume_template.pdf";  // Suggested filename for download

    // Append the link to the body (not visible)
    document.body.appendChild(link);
    
    // Simulate a click on the link to trigger the download
    link.click();
    
    // Remove the link after triggering the download
    document.body.removeChild(link);
  }} className="mt-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 py-2 transition-all duration-300"
>
  Download Resume Template
</Button>


      <div className='flex items-center gap-4 mt-4 w-800'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button onClick={handleSaveJob} className="bg-[#7209b7]">
          {isSaved ? "Unsave" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;*/


import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Cookies from 'js-cookie';  // You need to install js-cookie

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Checking if the job is saved in cookies
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]'); // Retrieve saved jobs from localStorage
    setIsSaved(savedJobs.includes(job._id));  // Set state based on saved job IDs in localStorage
  }, [job._id]); // Re-run this effect when the job changes


  const handleSaveJob = () => {
    //let savedJobs = JSON.parse(Cookies.get('savedJobs') || '[]');
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    let updatedJobs;

    if (savedJobs.includes(job._id)) {
      updatedJobs = savedJobs.filter(id => id !== job._id);
      toast.success("Removed from saved jobs");
    } else {
      updatedJobs = [...savedJobs, job._id];
      toast.success("Job saved for later");
    }

    // Update saved jobs in cookies
    //Cookies.set('savedJobs', JSON.stringify(updatedJobs), { expires: 1 }); // 1 day expiry
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    setIsSaved(updatedJobs.includes(job._id));
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const location = job?.location || "Location not available";

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 w-90'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          onClick={handleSaveJob}
          variant="outline"
          className={`rounded-full ${isSaved ? 'bg-yellow-100' : ''}`}
          size="icon"
        >
          <Bookmark className={isSaved ? 'text-yellow-500 fill-yellow-500' : ''} />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{location}</p>
        </div>
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
      <Button
        onClick={() => {
          // Create an invisible <a> element
          const link = document.createElement('a');
          link.href = job?.resumeTemplate;  // The resume URL
          link.target = "_blank";  // Open it in a new tab if required (not needed for download)
          link.download = job?.title + "_resume_template.pdf";  // Suggested filename for download

          // Append the link to the body (not visible)
          document.body.appendChild(link);

          // Simulate a click on the link to trigger the download
          link.click();

          // Remove the link after triggering the download
          document.body.removeChild(link);
        }} className="mt-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6 py-2 transition-all duration-300 ml-14"
      >
        View Resume Template
      </Button>

      <div className='flex items-center gap-4 mt-4  ml-9'>
        <Button onClick={() => navigate(`/description/${job?._id}`) } variant="outline" className="bg-[#7209b7] w-30 text-white">Details</Button>
        <Button onClick={handleSaveJob} className="bg-[#7209b7] ml- w-30">
          {isSaved ? "Unsave" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
