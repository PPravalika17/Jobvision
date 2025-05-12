// src/components/SavedJobs.jsx
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import Job from './Job';
import Navbar from './shared/Navbar'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs')) || [];

      if (savedJobIds.length === 0) {
        setSavedJobs([]);
        setLoading(false);
        return;
      }

      try {
        const jobPromises = savedJobIds.map(id =>
          axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true })
        );

        const responses = await Promise.all(jobPromises);
        const jobs = responses
          .filter(res => res.data.success)
          .map(res => res.data.job);

        setSavedJobs(jobs);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setSavedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : savedJobs.length === 0 ? (
          <p className="text-gray-600">No saved jobs yet. Go bookmark some!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {savedJobs.map(job => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
*/



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import Job from './Job';
import Navbar from './shared/Navbar';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs')) || [];
      const validJobs = [];
      const validIds = [];

      for (const id of savedJobIds) {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
            withCredentials: true,
          });

          if (res.data.success) {
            validJobs.push(res.data.job);
            validIds.push(id);
          }
        } catch (error) {
          console.warn(`Job with id ${id} not found. Removing from savedJobs.`);
        }
      }

      // Update localStorage to only keep valid job IDs
      localStorage.setItem('savedJobs', JSON.stringify(validIds));
      setSavedJobs(validJobs);
      setLoading(false);
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : savedJobs.length === 0 ? (
          <p className="text-gray-600">No saved jobs yet. Go bookmark some!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
