/*import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
    {
        !allAppliedJobs?.length || allAppliedJobs.filter(job => job?.job).length === 0
            ? <span className="text-center p-4 block text-muted">You haven't applied to any job or the jobs are no longer available.</span>
            : allAppliedJobs
                .filter(appliedJob => appliedJob?.job)  // 👈 Only include jobs that still exist
                .map((appliedJob) => (
                    <TableRow key={appliedJob._id}>
                        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob.job?.title}</TableCell>
                        <TableCell>{appliedJob.job?.company?.name}</TableCell>
                        <TableCell className="text-right">
                            <Badge className={`${
                                appliedJob?.status === "rejected"
                                    ? 'bg-red-400'
                                    : appliedJob.status === 'pending'
                                    ? 'bg-gray-400'
                                    : 'bg-green-400'
                            }`}>
                                {appliedJob.status.toUpperCase()}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))
    }
</TableBody>

            </Table>
        </div>
    )
}

export default AppliedJobTable*/

/*

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant'; // Make sure to use the correct API endpoint for job details
import { setAllAppliedJobs } from '@/redux/jobSlice';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [validJobs, setValidJobs] = useState([]);
/*
  useEffect(() => {
    const fetchValidJobs = async () => {
      const jobsToCheck = allAppliedJobs.filter((appliedJob) => appliedJob?.job);
      try {
        // Fetch job details to check if they are still available
        const jobPromises = jobsToCheck.map((appliedJob) =>
          axios.get(`${JOB_API_END_POINT}/get/${appliedJob.job._id}`)
        );
        const responses = await Promise.all(jobPromises);

        // Filter out jobs that no longer exist
        const validJobIds = responses.filter((res) => res.data.success).map((res) => res.data.job._id);
        const filteredJobs = allAppliedJobs.filter((appliedJob) =>
          validJobIds.includes(appliedJob?.job?._id)
        );

        setValidJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setValidJobs([]); // Fallback to empty array if API fails
      }
    };

    fetchValidJobs();
  }, [allAppliedJobs]);
*//*
useEffect(() => {
  const fetchValidJobs = async () => {
    const jobsToCheck = allAppliedJobs.filter((appliedJob) => appliedJob?.job);

    try {
      // Fetch job details to check if they are still available
      const jobPromises = jobsToCheck.map((appliedJob) =>
        axios.get(`${JOB_API_END_POINT}/get/${appliedJob.job._id}`)
      );
      const responses = await Promise.all(jobPromises);

      // Filter out jobs that no longer exist
      const validJobIds = responses.filter((res) => res.data.success).map((res) => res.data.job._id);
      const filteredJobs = allAppliedJobs.filter((appliedJob) =>
        validJobIds.includes(appliedJob?.job?._id)
      );

      // Dispatch the action to set valid applied jobs in Redux
      dispatch(setAllAppliedJobs(filteredJobs));
      setValidJobs(filteredJobs);  // Optionally update local state for the component
    } catch (error) {
      console.error("Error fetching job details:", error);
      setValidJobs([]); // Fallback to empty array if API fails
    }
  };

  fetchValidJobs();
}, [allAppliedJobs, dispatch]); 
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {validJobs.length === 0 ? (
            <span className="text-center p-4 block text-muted">
              You haven't applied to any job or the jobs are no longer available.
            </span>
          ) : (
            validJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob?.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;*/
/*
import React, { useEffect, useState,useRef } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setAllAppliedJobs } from '@/redux/jobSlice';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [validJobs, setValidJobs] = useState([]);
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle API error
/*
  useEffect(() => {
    const fetchValidJobs = async () => {
      const jobsToCheck = allAppliedJobs.filter((appliedJob) => appliedJob?.job);
   
      try {
         setLoading(true);
         setError(null);
   
         // Fetch job details with credentials (cookies)
         const jobPromises = jobsToCheck.map((appliedJob) =>
            axios.get(`${JOB_API_END_POINT}/get/${appliedJob.job._id}`, {
               withCredentials: true, // Ensure cookies are sent with request
            })
         );
         const responses = await Promise.all(jobPromises);
   
         // Handle valid jobs
         const validJobIds = responses.filter((res) => res.data.success).map((res) => res.data.job._id);
         const filteredJobs = allAppliedJobs.filter((appliedJob) =>
            validJobIds.includes(appliedJob?.job?._id)
         );
         dispatch(setAllAppliedJobs(filteredJobs));
         setValidJobs(filteredJobs);
      } catch (error) {
         console.error("Error fetching job details:", error);
         setError("Failed to load job details. Please try again later.");
         setValidJobs([]);
      } finally {
         setLoading(false);
      }
   };
   

    fetchValidJobs();
  }, [allAppliedJobs, dispatch]);
*//*
console.log("Valid Jobs to Render:", validJobs);  // Log validJobs to check before rendering
const prevAppliedJobs = useRef();
/*
useEffect(() => {
  // Skip if applied jobs haven't changed
  if (prevAppliedJobs.current && JSON.stringify(prevAppliedJobs.current) === JSON.stringify(allAppliedJobs)) {
    return; // No change, don't re-fetch
  }

  // Update the ref to the new value
  prevAppliedJobs.current = allAppliedJobs;

  const fetchValidJobs = async () => {
    const jobsToCheck = allAppliedJobs.filter((appliedJob) => appliedJob?.job && appliedJob.job !== null);

    console.log("Jobs to Check:", jobsToCheck);

    try {
      setLoading(true);
      setError(null);

      const jobPromises = jobsToCheck.map((appliedJob) =>
        axios.get(`${JOB_API_END_POINT}/get/${appliedJob.job._id}`, {
          withCredentials: true,
        })
      );
      const responses = await Promise.all(jobPromises);

      const validJobIds = responses.filter((res) => res.data.success).map((res) => res.data.job._id);
      const filteredJobs = allAppliedJobs.filter((appliedJob) =>
        validJobIds.includes(appliedJob?.job?._id)
      );

      dispatch(setAllAppliedJobs(filteredJobs));
      setValidJobs(filteredJobs);

    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to load job details. Please try again later.");
      setValidJobs([]);
    } finally {
      setLoading(false);
    }
  };*//*
  useEffect(() => {
    const fetchValidJobs = async () => {
      try {
        setLoading(true);
        setError(null);
    
        // 🔁 Step 1: Fetch updated applied jobs from backend
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
    
        const appliedJobs = res.data.application || [];
    
        // 🔍 Step 2: Check which jobs still exist
        const jobsToCheck = appliedJobs.filter((appliedJob) => appliedJob?.job && appliedJob.job !== null);
    
        const jobPromises = jobsToCheck.map((appliedJob) =>
          axios.get(`${JOB_API_END_POINT}/get/${appliedJob.job._id}`, {
            withCredentials: true,
          })
        );
        const responses = await Promise.all(jobPromises);
    
        const validJobIds = responses.filter((res) => res.data.success).map((res) => res.data.job._id);
        const filteredJobs = appliedJobs.filter((appliedJob) =>
          validJobIds.includes(appliedJob?.job?._id)
        );
    
        // ✅ Step 3: Save the up-to-date jobs with status
        dispatch(setAllAppliedJobs(filteredJobs));
        setValidJobs(filteredJobs);
    
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details. Please try again later.");
        setValidJobs([]);
      } finally {
        setLoading(false);
      }
    };
    
  

  fetchValidJobs();
}, [allAppliedJobs, dispatch]);


  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center p-4 text-muted">
        Loading jobs...
      </TableCell>
    </TableRow>
  ) : error ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center p-4 text-muted">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary mt-2">
          Retry
        </button>
      </TableCell>
    </TableRow>
  ) : validJobs.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center p-4 text-muted">
        You haven't applied to any job or the jobs are no longer available.
      </TableCell>
    </TableRow>
  ) : (
    validJobs.map((appliedJob) => (
      <TableRow key={appliedJob._id || appliedJob.job._id}>
        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
        <TableCell>{appliedJob?.job?.title}</TableCell>
        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
        <TableCell className="text-right">
          <Badge
            className={`${
              appliedJob?.status === "rejected"
                ? "bg-red-400"
                : appliedJob.status === "pending"
                ? "bg-gray-400"
                : appliedJob.status === "accepted"
                ? "bg-green-400"
                : "bg-yellow-400"
            }`}
          >
            {appliedJob?.status.toUpperCase()}
          </Badge>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

      </Table>
    </div>
  );
};

export default AppliedJobTable;*/


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';;

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const allAppliedJobs = useSelector((state) => state.job.allAppliedJobs);
  const [validJobs, setValidJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValidJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        const appliedJobs = res.data.application || [];

        const jobsToCheck = appliedJobs.filter(
          (appliedJob) => appliedJob?.job && appliedJob.job !== null
        );

        const jobPromises = jobsToCheck.map((appliedJob) =>
          axios.get(`${JOB_API_END_POINT}/get/${appliedJob.job._id}`, {
            withCredentials: true,
          })
        );

        const responses = await Promise.all(jobPromises);

        const validJobIds = responses
          .filter((res) => res.data.success)
          .map((res) => res.data.job._id);

        const filteredJobs = appliedJobs.filter((appliedJob) =>
          validJobIds.includes(appliedJob?.job?._id)
        );

        dispatch(setAllAppliedJobs(filteredJobs));
        setValidJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details. Please try again later.");
        setValidJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchValidJobs();
  }, [dispatch]);

  return (
    <div className="min-h-[300px]">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center p-4 text-muted">
                Loading jobs...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center p-4 text-muted">
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary mt-2"
                >
                  Retry
                </button>
              </TableCell>
            </TableRow>
          ) : validJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center p-4 text-muted">
                You haven't applied to any job or the jobs are no longer available.
              </TableCell>
            </TableRow>
          ) : (
            validJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id || appliedJob.job._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : appliedJob.status === "accepted"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;

