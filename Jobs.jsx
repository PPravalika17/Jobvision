/*import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice'; // Assuming it's imported correctly

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    dispatch(setSearchedQuery(value));
  };

  useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();

        const titleMatch = job.title && typeof job.title === 'string' && job.title.toLowerCase().includes(query);
        const descriptionMatch = job.description && typeof job.description === 'string' && job.description.toLowerCase().includes(query);
        const locationMatch = job.location && typeof job.location === 'string' && job.location.toLowerCase().includes(query);
        const salaryMatch = job.salary && typeof job.salary === 'number' && job.salary.toString().toLowerCase().includes(query);
        const companyMatch = job.company && job.company.name && typeof job.company.name === 'string' && job.company.name.toLowerCase().includes(query);
        const jobTypeMatch = job.jobType && typeof job.jobType === 'string' && job.jobType.toLowerCase().includes(query);

        return (
          titleMatch ||
          descriptionMatch ||
          locationMatch ||
          salaryMatch ||
          companyMatch ||
          jobTypeMatch
        );
      });

      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  useEffect(() => {
    if (searchedQuery) {
      // Clean input: remove "lpa", lowercase, trim
      let input = searchedQuery.toLowerCase().replace(/lpa/g, '').trim();
  
      let minSalary = 0;
      let maxSalary = Infinity;
      let isExactMatch = false;
      let keyword = input;
  
      // 🎯 Match range: 5-10 or salary:5-10
      const rangeMatch = input.match(/(?:salary:)?\b(\d+)-(\d+)\b/);
      if (rangeMatch) {
        minSalary = parseInt(rangeMatch[1]);
        maxSalary = parseInt(rangeMatch[2]);
        keyword = input.replace(rangeMatch[0], '').trim();
      } else {
        // 🎯 Match single digit: 5 or salary:5 (exact match)
        const singleMatch = input.match(/(?:salary:)?\b(\d+)\b/);
        if (singleMatch) {
          minSalary = parseInt(singleMatch[1]);
          maxSalary = parseInt(singleMatch[1]);
          isExactMatch = true;
          keyword = input.replace(singleMatch[0], '').trim();
        }
      }
  
      const filtered = allJobs.filter((job) => {
        const title = job.title?.toLowerCase() || '';
        const description = job.description?.toLowerCase() || '';
        const location = job.location?.toLowerCase() || '';
        const company = job.company?.name?.toLowerCase() || '';
        const jobType = job.jobType?.toLowerCase() || '';
        const salary = Number(job.salary) || 0;
  
        const keywordMatch =
          keyword === '' ||
          title.includes(keyword) ||
          description.includes(keyword) ||
          location.includes(keyword) ||
          company.includes(keyword) ||
          jobType.includes(keyword);
  
        const salaryMatch = salary >= minSalary && salary <= maxSalary;
  
        return keywordMatch && salaryMatch;
      });
  
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={(e) => changeHandler(e.target.value)}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;*/
/*import React, { useEffect, useState } from 'react';

import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setAllJobs, setFilteredJobs, setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const filteredJobs = useSelector((store) => store.job.filteredJobs);
  const searchedQuery = useSelector((store) => store.job.searchedQuery);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/job');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      dispatch(setAllJobs(data));  // Set the fetched jobs in Redux
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const changeHandler = (value) => {
    dispatch(setSearchedQuery(value));
  };

  useEffect(() => {
    const jobsToFilter = allJobs;
    if (searchedQuery) {
      let input = searchedQuery.toLowerCase().replace(/lpa/g, '').trim();
      let minSalary = 0, maxSalary = Infinity, keyword = input;

      const rangeMatch = input.match(/(?:salary:)?\b(\d+)-(\d+)\b/);
      if (rangeMatch) {
        minSalary = parseInt(rangeMatch[1]);
        maxSalary = parseInt(rangeMatch[2]);
        keyword = input.replace(rangeMatch[0], '').trim();
      }

      const filtered = jobsToFilter.filter((job) => {
        const title = job.title?.toLowerCase() || '';
        const description = job.description?.toLowerCase() || '';
        const location = job.location?.toLowerCase() || '';
        const company = job.company?.name?.toLowerCase() || '';
        const jobType = job.jobType?.toLowerCase() || '';
        const salary = Number(job.salary) || 0;

        const keywordMatch =
          keyword === '' ||
          title.includes(keyword) ||
          description.includes(keyword) ||
          location.includes(keyword) ||
          company.includes(keyword) ||
          jobType.includes(keyword);

        const salaryMatch = salary >= minSalary && salary <= maxSalary;

        return keywordMatch && salaryMatch;
      });

      dispatch(setFilteredJobs(filtered));
    } else {
      dispatch(setFilteredJobs(jobsToFilter));
    }
  }, [allJobs, searchedQuery, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={(e) => changeHandler(e.target.value)}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length === 0 ? (
            <span>No jobs found matching your search criteria.</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div key={job._id}>
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
*/

/*
import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice'; // Assuming it's imported correctly

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    dispatch(setSearchedQuery(value));
  };

  // Effect to update the filtered jobs based on the searched query
  /*useEffect(() => {
    if (searchedQuery) {
      const filtered = allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();

        const titleMatch = job.title && typeof job.title === 'string' && job.title.toLowerCase().includes(query);
        const descriptionMatch = job.description && typeof job.description === 'string' && job.description.toLowerCase().includes(query);
        const locationMatch = job.location && typeof job.location === 'string' && job.location.toLowerCase().includes(query);
        const salaryMatch = job.salary && typeof job.salary === 'number' && job.salary.toString().toLowerCase().includes(query);
        const companyMatch = job.company && job.company.name && typeof job.company.name === 'string' && job.company.name.toLowerCase().includes(query);
        const jobTypeMatch = job.jobType && typeof job.jobType === 'string' && job.jobType.toLowerCase().includes(query);

        return (
          titleMatch ||
          descriptionMatch ||
          locationMatch ||
          salaryMatch ||
          companyMatch ||
          jobTypeMatch
        );
      });

      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]); // Depend on allJobs, so when Redux state changes, it re-renders
*//*
useEffect(() => {
  if (searchedQuery && allJobs.length > 0) {
    const filtered = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      const titleMatch = job.title && job.title.toLowerCase().includes(query);
      const descriptionMatch = job.description && job.description.toLowerCase().includes(query);
      const locationMatch = job.location && job.location.toLowerCase().includes(query);
      const salaryMatch = job.salary && job.salary.toString().toLowerCase().includes(query);
      const companyMatch = job.company && job.company.name && job.company.name.toLowerCase().includes(query);
      const jobTypeMatch = job.jobType && job.jobType.toLowerCase().includes(query);

      return (
        titleMatch ||
        descriptionMatch ||
        locationMatch ||
        salaryMatch ||
        companyMatch ||
        jobTypeMatch
      );
    });
    setFilteredJobs(filtered);
  } else if (allJobs.length > 0) {
    setFilteredJobs(allJobs);
  }
}, [allJobs, searchedQuery]); // Depend on allJobs, so when Redux state changes, it re-renders

const fetchJobs = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/job');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    dispatch(setAllJobs(data));  // Set the fetched jobs in Redux
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
  }
};

useEffect(() => {
  if (allJobs.length === 0) {  // Fetch jobs only if they aren't already in state
    fetchJobs();
  }
}, [allJobs.length]); // Ensure that fetchJobs only runs when needed

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={(e) => changeHandler(e.target.value)}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;*/
/*
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setAllJobs, setFilteredJobs, setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const Jobs = () => {
  const { allJobs, filteredJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const location = useLocation(); // Detect URL changes

  // Fetch jobs only if not already in Redux
  useEffect(() => {
    if (allJobs.length === 0) {
      const fetchJobs = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/v1/job');
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          dispatch(setAllJobs(data));  // Set the fetched jobs in Redux
        } catch (error) {
          console.error('Error fetching jobs:', error.message);
        }
      };

      fetchJobs();
    }
  }, [allJobs.length, dispatch]);

  // Update search query from URL (if applicable)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search') || ''; // Example: If search query is in URL
    dispatch(setSearchedQuery(query));
  }, [location.search, dispatch]);

  const changeHandler = (value) => {
    dispatch(setSearchedQuery(value));
  };

  // Filter jobs based on the search query
  useEffect(() => {
    if (searchedQuery && allJobs.length > 0) {
      let input = searchedQuery.toLowerCase().replace(/lpa/g, '').trim();
      let minSalary = 0, maxSalary = Infinity, keyword = input;

      // Match salary range or single value (e.g., "5-10" or "salary:5")
      const rangeMatch = input.match(/(?:salary:)?\b(\d+)-(\d+)\b/);
      if (rangeMatch) {
        minSalary = parseInt(rangeMatch[1]);
        maxSalary = parseInt(rangeMatch[2]);
        keyword = input.replace(rangeMatch[0], '').trim();
      }

      // Filter jobs based on keyword and salary range
      const filtered = allJobs.filter((job) => {
        const title = job.title?.toLowerCase() || '';
        const description = job.description?.toLowerCase() || '';
        const location = job.location?.toLowerCase() || '';
        const company = job.company?.name?.toLowerCase() || '';
        const jobType = job.jobType?.toLowerCase() || '';
        const salary = Number(job.salary) || 0;

        const keywordMatch =
          keyword === '' ||
          title.includes(keyword) ||
          description.includes(keyword) ||
          location.includes(keyword) ||
          company.includes(keyword) ||
          jobType.includes(keyword);

        const salaryMatch = salary >= minSalary && salary <= maxSalary;

        return keywordMatch && salaryMatch;
      });

      dispatch(setFilteredJobs(filtered));
    } else {
      dispatch(setFilteredJobs(allJobs));  // Reset to all jobs if no search query
    }
  }, [searchedQuery, allJobs, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={(e) => changeHandler(e.target.value)}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length === 0 ? (
            <span>No jobs found matching your search criteria.</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;*/

/*
import React, { useEffect, useState,useMemo } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setAllJobs, setFilteredJobs, setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import debounce from 'lodash.debounce'; // Debounce function to prevent rapid state updates
import axios from "axios";

import { useSearchParams } from "react-router-dom";
import { JOB_API_END_POINT } from '@/utils/constant';

const Jobs = () => {
  //const { allJobs, filteredJobs, searchedQuery } = useSelector((store) => store.job);
  const allJobs = useSelector((state) => state.job.allJobs); // or however you're storing it
  
  
  const [searchParams] = useSearchParams();
const searchedQuery = searchParams.get("query")?.toLowerCase() || "";


const filteredJobs = useMemo(() => {
  return allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchedQuery.toLowerCase())
  );
}, [allJobs, searchedQuery]);

  const dispatch = useDispatch();
  const location = useLocation(); // Detect URL changes

  // Fetch jobs only if not already in Redux
  useEffect(() => {
    if (allJobs.length === 0) {
      const fetchJobs = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get('http://localhost:8080/api/v1/job/get', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setAllJobs(response.data.jobs));
        } catch (error) {
          console.error('Error fetching jobs:', error.message);
        }
      };
      

      fetchJobs();
    }
  }, [allJobs.length, dispatch]);

  // Update search query from URL (if applicable)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search') || ''; // Example: If search query is in URL
    if (searchedQuery !== query) {
      dispatch(setSearchedQuery(query));
    }
  }, [location.search, dispatch]);

  // Handle change in the search bar with debounce
  const handleChange = debounce((e) => {
    dispatch(setSearchedQuery(e.target.value));
  }, 300); // Debounced input (waits 300ms after typing)

  // Clear search bar functionality
  const handleClearSearch = () => {
    dispatch(setSearchedQuery('')); // Reset search query
  };

  // Filter jobs based on the search query
  const filteredJobList = allJobs.filter((job) => {
    if (!searchedQuery) return true;
    const searchLower = searchedQuery.toLowerCase();
    const title = job.title?.toLowerCase() || '';
    const description = job.description?.toLowerCase() || '';
    const location = job.location?.toLowerCase() || '';
    const company = job.company?.name?.toLowerCase() || '';
    const jobType = job.jobType?.toLowerCase() || '';

    return (
      title.includes(searchLower) ||
      description.includes(searchLower) ||
      location.includes(searchLower) ||
      company.includes(searchLower) ||
      jobType.includes(searchLower)
    );
  });

  // Only update filtered jobs if they change
  useEffect(() => {
    if (filteredJobs !== filteredJobList) {
      dispatch(setFilteredJobs(filteredJobList));
    }
  }, [filteredJobList, filteredJobs, dispatch]); // Only dispatch if the filtered jobs change

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={handleChange}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;*/
/*
import React, { useEffect, useMemo } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setAllJobs, setFilteredJobs, setSearchedQuery } from '@/redux/jobSlice';
import { useSearchParams } from 'react-router-dom'; 
import debounce from 'lodash.debounce'; 
import axios from 'axios';

const Jobs = () => {
  const allJobs = useSelector((state) => state.job.allJobs);
  const [searchParams] = useSearchParams();
  const searchedQuery = searchParams.get('query')?.toLowerCase() || '';
  const dispatch = useDispatch();

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) =>
      job.title.toLowerCase().includes(searchedQuery) ||
      job.description.toLowerCase().includes(searchedQuery) ||
      job.location.toLowerCase().includes(searchedQuery) ||
      job.company.name.toLowerCase().includes(searchedQuery) ||
      job.jobType.toLowerCase().includes(searchedQuery)
    );
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    if (!allJobs || allJobs.length === 0) { 
      const fetchJobs = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Token is missing');
            return;
          }

          const response = await axios.get('http://localhost:8080/api/v1/job/get', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setAllJobs(response.data.jobs));
        } catch (error) {
          console.error('Error fetching jobs:', error.message);
        }
      };
      fetchJobs();
    }
  }, [allJobs, dispatch]);

  useEffect(() => {
    dispatch(setFilteredJobs(filteredJobs)); // Only dispatch when filtered jobs actually change
  }, [filteredJobs, dispatch]);

  const handleChange = debounce((e) => {
    dispatch(setSearchedQuery(e.target.value));

    // Create a new URLSearchParams instance
    const updatedSearchParams = new URLSearchParams(window.location.search);
    updatedSearchParams.set('query', e.target.value); // Update URL with query
    window.history.replaceState(null, '', `?${updatedSearchParams.toString()}`);
  }, 300);

  const handleClearSearch = () => {
    dispatch(setSearchedQuery(''));

    // Create a new URLSearchParams instance and remove the 'query' param
    const updatedSearchParams = new URLSearchParams(window.location.search);
    updatedSearchParams.delete('query'); // Remove query parameter
    window.history.replaceState(null, '', `?${updatedSearchParams.toString()}`);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={handleChange}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleClearSearch}>Clear Search</button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
*/
/*

import React, { useEffect, useMemo } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setAllJobs, setFilteredJobs, setSearchedQuery } from '@/redux/jobSlice';
import { useSearchParams } from 'react-router-dom'; 
import debounce from 'lodash.debounce'; 
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie
import useGetAllJobs from '@/hooks/useGetAllJobs';
const Jobs = () => {
  const allJobs = useSelector((state) => state.job.allJobs);
  const [searchParams] = useSearchParams();
  //const searchedQuery = searchParams.get('query')?.toLowerCase() || '';
  const searchedQuery = useSelector((state) => state.job.searchedQuery);

  const dispatch = useDispatch();

 /* const filteredJobs = useMemo(() => {
    return allJobs.filter((job) =>
      job.title.toLowerCase().includes(searchedQuery) ||
      job.description.toLowerCase().includes(searchedQuery) ||
      job.location.toLowerCase().includes(searchedQuery) ||
      job.company.name.toLowerCase().includes(searchedQuery) ||
      job.jobType.toLowerCase().includes(searchedQuery)
    );
  }, [allJobs, searchedQuery]);*//*
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) =>
      job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.jobType.toLowerCase().includes(searchedQuery.toLowerCase())
    );
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    if (!allJobs || allJobs.length === 0) { 
      const fetchJobs = async () => {
        try {
          const token = Cookies.get('token');  
          if (!token) {
            console.error('Token is missing');
            return;
          }
      
          const response = await axios.get('http://localhost:8080/api/v1/job/get', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          dispatch(setAllJobs(response.data.jobs));
        } catch (error) {
          console.error('Error fetching jobs:', error.message);
          // Optionally, set an error state here
        }
      };
      
      fetchJobs();
    }
  }, [allJobs, dispatch]);

  useEffect(() => {
    dispatch(setFilteredJobs(filteredJobs)); // Only dispatch when filtered jobs actually change
  }, [filteredJobs, dispatch]);

  const handleChange = debounce((e) => {
    dispatch(setSearchedQuery(e.target.value));

    // Create a new URLSearchParams instance
    const updatedSearchParams = new URLSearchParams(window.location.search);
    updatedSearchParams.set('query', e.target.value); // Update URL with query
    window.history.replaceState(null, '', `?${updatedSearchParams.toString()}`);
  }, 300);

  const handleClearSearch = () => {
    dispatch(setSearchedQuery(''));

    // Create a new URLSearchParams instance and remove the 'query' param
    const updatedSearchParams = new URLSearchParams(window.location.search);
    updatedSearchParams.delete('query'); // Remove query parameter
    window.history.replaceState(null, '', `?${updatedSearchParams.toString()}`);
  };
  useGetAllJobs(); // just call it with no query

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={searchedQuery}
            onChange={handleChange}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleClearSearch}>Clear Search</button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;*/

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setFilteredJobs, setSearchedQuery } from '@/redux/jobSlice';
import debounce from 'lodash.debounce';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector((state) => state.job.allJobs);
  const searchedQuery = useSelector((state) => state.job.searchedQuery);
  const [localQuery, setLocalQuery] = useState(searchedQuery);

  useGetAllJobs(); // Fetch all jobs
  const parseSalaryInput = (input) => {
  const cleaned = input.toLowerCase().replace(/\s/g, '');
  const lpaMatch = cleaned.match(/([\d.]+)lpa/);
  if (lpaMatch) return parseFloat(lpaMatch[1]) * 100000;

  const numMatch = cleaned.match(/([\d.]+)/);
  return numMatch ? parseFloat(numMatch[1]) * (cleaned.includes('lpa') ? 100000 : 1) : NaN;
};

const matchesSalary = (jobSalary, query) => {
  if (!query) return true;

  const cleanedQuery = query.toLowerCase().replace(/\s/g, '');
  const salary = Number(jobSalary);

  if (cleanedQuery.startsWith('>')) {
    const val = parseSalaryInput(cleanedQuery.slice(1));
    return salary > val;
  }

  if (cleanedQuery.startsWith('<')) {
    const val = parseSalaryInput(cleanedQuery.slice(1));
    return salary < val;
  }

  if (cleanedQuery.includes('-')) {
    const [minStr, maxStr] = cleanedQuery.split('-');
    const min = parseSalaryInput(minStr);
    const max = parseSalaryInput(maxStr);
    return salary >= min && salary <= max;
  }

  const exact = parseSalaryInput(cleanedQuery);
  return salary === exact || salary.toString().includes(exact.toString());
};

  
  
  

const filteredJobs = useMemo(() => {
  const query = searchedQuery.trim().toLowerCase();
  if (!query) return allJobs; // return all if query is empty

  const terms = query.split(/[\s,]+/).filter(Boolean);

  return allJobs.filter((job) => {
    const jobData = [
      job.title,
      job.description,
      job.location,
      job.company?.name,
      job.jobType
    ]
      .join(' ')
      .toLowerCase();

    const jobSalary = job.salary || 0;

    return terms.every((term) => {
      return (
        jobData.includes(term) ||
        matchesSalary(jobSalary, term)
      );
    });
    
  });
}, [allJobs, searchedQuery]);

 

  useEffect(() => {
    dispatch(setFilteredJobs(filteredJobs));
  }, [filteredJobs, dispatch]);

  // Debounce dispatch to Redux
  const debouncedDispatch = useCallback(
    debounce((query) => {
      dispatch(setSearchedQuery(query));

      const updatedSearchParams = new URLSearchParams(window.location.search);
      if (query) {
        updatedSearchParams.set('query', query);
      } else {
        updatedSearchParams.delete('query');
      }
      window.history.replaceState(null, '', `?${updatedSearchParams.toString()}`);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);          // Update input instantly
    debouncedDispatch(value);     // Debounced update to Redux
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchedQuery(''));

    const updatedSearchParams = new URLSearchParams(window.location.search);
    updatedSearchParams.delete('query');
    window.history.replaceState(null, '', `?${updatedSearchParams.toString()}`);
  };

  


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
    {/* Background Div with Blur Effect */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/bg4.webp')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'blur(7px)',  // Apply blur only to the background
        zIndex: -1,           // Ensure background stays behind the content
      }}
    />
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="w-full mb-5 flex gap-25">
          <input
            type="text"
            placeholder="Search jobs by role, company, salary, description..."
            value={localQuery}
            onChange={handleChange}
            className="w-full py-4 px-6 text-xl border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
  onClick={handleClearSearch}
  className="ml-2 px-2 py-0.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition w-20"
>
  Clear
</button>



        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job._id}
              >
                <Job job={job} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

