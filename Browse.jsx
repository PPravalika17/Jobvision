/*import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
//import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

//const randomJobs=[1,2,3];
const Browse = () => {
    useGetAllJobs();
    const {allJobs}=useSelector(store=>store.job);
    const dispatch=useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job  key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse*/
// Browse.jsx
/*import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery, setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Fetch all jobs using custom hook
  useGetAllJobs();

  // Clear the search query when unmounting
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  // Delete job handler
  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete the job. Please try again later.');
    }
  };

  // Filter jobs based on search query
  const filteredJobs = searchedQuery
    ? allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        );
      })
    : allJobs;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>
            {searchedQuery
              ? `No jobs found for "${searchedQuery}". Try different keywords.`
              : 'No jobs available at the moment.'}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;*/
/*import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery, setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Fetch all jobs using custom hook
  useGetAllJobs();
  
  // Get the search query from localStorage on page load
  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      dispatch(setSearchedQuery(savedQuery)); // Set the query from localStorage in the Redux state
    }
  }, [dispatch]);

  // Clear the search query when unmounting
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  // Delete job handler
  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete the job. Please try again later.');
    }
  };

  // Filter jobs based on search query (category)
  const filteredJobs = searchedQuery
  ? allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(query) ||
        job?.description?.toLowerCase().includes(query) ||
        job?.location?.toLowerCase().includes(query) ||
        job?.category?.toLowerCase().includes(query)
      );
    })
  : allJobs;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>
            {searchedQuery
              ? `No jobs found for ${searchedQuery}. `
              : 'No jobs available at the moment.'}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;*/

// Browse.jsx
/*import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useSearchParams } from 'react-router-dom'; // ⬅️ import this

const Browse = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || ""; // ⬅️ Get query from URL

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useGetAllJobs();

  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
      }
    } catch (error) {
      console.log('Error deleting job:', error);
    }
  };
  const filteredJobs = allJobs.length > 0
  ? allJobs.filter((job) => {
      const title = job?.title?.toLowerCase() || "";
      const description = job?.description?.toLowerCase() || "";
      const location = job?.location?.toLowerCase() || "";

      return (
        title.includes(query) ||
        query.includes(title) ||
        description.includes(query) ||
        query.includes(description) ||
        location.includes(query) ||
        query.includes(location)
      );
    })
  : [];


  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>No jobs found </p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
*/


/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Job from './Job';
import { setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || ""; // Extract query and normalize
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  
  const [filteredJobs, setFilteredJobs] = useState([]);

  useGetAllJobs();

  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
      }
    } catch (error) {
      console.log('Error deleting job:', error);
    }
  };

  useEffect(() => {
    // Only filter if we have jobs
    if (allJobs.length > 0) {
      // Split the query into words and convert them to lowercase for more flexible matching
      const queryWords = query.split(" ").map(word => word.trim());

      const filtered = allJobs.filter((job) => {
        const title = job?.title?.toLowerCase() || "";
        const description = job?.description?.toLowerCase() || "";
        const location = job?.location?.toLowerCase() || "";
        const category = job?.category?.toLowerCase() || "";

        // Match any word in the query with title, description, location, or category
        return queryWords.some((word) => {
          return (
            title.includes(word) ||
            description.includes(word) ||
            location.includes(word) ||
            category.includes(word)
          );
        });
      });

      setFilteredJobs(filtered);
    }
  }, [allJobs, query]);

  // Debugging logs
  useEffect(() => {
    console.log("Current Query:", query); // Log query from URL
    console.log("Filtered Jobs:", filteredJobs); // Log filtered jobs
  }, [query, filteredJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
*/

/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Job from './Job';
import { setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || ""; // Extract query and normalize
  const { allJobs } = useSelector((store) => store.job); // Get jobs from Redux store
  const dispatch = useDispatch();
  
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Call useGetAllJobs to dispatch jobs to Redux (no need to call here if jobs are already in Redux)
  useGetAllJobs(); // This could be moved outside the component if it dispatches the jobs in Redux.

  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        // Instead of filtering again, remove the deleted job from the local state
        dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
      }
    } catch (error) {
      console.log('Error deleting job:', error);
    }
  };

  // This effect handles filtering based on the query from the URL
  useEffect(() => {
    if (allJobs.length > 0) {
      // Split the query into words for flexible matching
      const queryWords = query.split(" ").map((word) => word.trim());

      const filtered = allJobs.filter((job) => {
        const title = job?.title?.toLowerCase() || "";
        const description = job?.description?.toLowerCase() || "";
        const location = job?.location?.toLowerCase() || "";
        const category = job?.category?.toLowerCase() || "";

        // Check if any word matches any of the fields
        return queryWords.some((word) => {
          return (
            title.includes(word) ||
            description.includes(word) ||
            location.includes(word) ||
            category.includes(word)
          );
        });
      });

      setFilteredJobs(filtered); // Update the filtered jobs state
    }
  }, [allJobs, query]); // Re-filter when query or allJobs changes

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;*/
/*
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Job from './Job';
import { setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const Browse = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || ""; // Extract query and normalize
  const { allJobs } = useSelector((store) => store.job); // Get jobs from Redux store
  const dispatch = useDispatch();
  
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Call useGetAllJobs to dispatch jobs to Redux (no need to call here if jobs are already in Redux)
  useGetAllJobs(); // This could be moved outside the component if it dispatches the jobs in Redux.

  const deleteJob = async (id) => {
    try {
      // Get token from cookies
      const token = Cookies.get('token');
      
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the header
        },
        withCredentials: true, // Ensure cookie is sent with the request
      });

      if (res.data.success) {
        // Remove the job from state if the delete was successful
        dispatch(setAllJobs(allJobs.filter((job) => job._id !== id)));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Effect for filtering jobs based on query
  useEffect(() => {
    if (allJobs.length > 0) {
      const queryWords = query.split(" ").map((word) => word.trim());

      const filtered = allJobs.filter((job) => {
        const title = job?.title?.toLowerCase() || "";
        const description = job?.description?.toLowerCase() || "";
        const location = job?.location?.toLowerCase() || "";
        const category = job?.category?.toLowerCase() || "";

        return queryWords.some((word) => {
          return (
            title.includes(word) ||
            description.includes(word) ||
            location.includes(word) ||
            category.includes(word)
          );
        });
      });

      setFilteredJobs(filtered);
    }
  }, [allJobs, query]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} onDelete={deleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;*/

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import Job from './Job';
import { setAllJobs } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSearchParams } from 'react-router-dom';

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job); // Get jobs from Redux store
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search query

  // Fetch all jobs and dispatch to Redux store
 
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useGetAllJobs(query);
  // Effect for filtering jobs based on local search query
  useEffect(() => {
    if (allJobs.length === 0) return;

    const queryWords = searchQuery.split(" ").map((word) => word.trim());

    const filtered = allJobs.filter((job) => {
      const title = job?.title?.toLowerCase() || "";
      const description = job?.description?.toLowerCase() || "";
      const location = job?.location?.toLowerCase() || "";
      const category = job?.category?.toLowerCase() || "";

      return queryWords.some((word) => {
        return (
          title.includes(word) ||
          description.includes(word) ||
          location.includes(word) ||
          category.includes(word)
        );
      });
    });

    setFilteredJobs(filtered);  // Update filtered jobs based on query
  }, [allJobs, searchQuery]);  // Re-run when allJobs or searchQuery changes

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        
        
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
