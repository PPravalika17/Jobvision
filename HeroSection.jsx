/*import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full h-10'
                    />
                    <Button onClick={searchJobHandler}className="rounded-r-full bg-[#6A38C2] h-15 w-15">
                        <Search className='h-100 w-100' />
                    </Button>
                    </div>
            </div>
        </div>
    )
}

export default HeroSection
*/

/*
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        // Log the query value to ensure it's being set correctly
        console.log("Searching for:", query);

        dispatch(setSearchedQuery(query)); // Dispatch query to Redux
        navigate("/browse"); // Navigate to browse page
    };

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => {
                            setQuery(e.target.value);
                            console.log("Query updated:", e.target.value); // Log query value on change
                        }}
                        className='outline-none border-none w-full h-10'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] h-15 w-15">
                        <Search className='h-100 w-100' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;*/
/*import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // On page load, check if there's a search query saved in localStorage
    useEffect(() => {
        const savedQuery = localStorage.getItem('searchQuery');
        if (savedQuery) {
            setQuery(savedQuery);
            dispatch(setSearchedQuery(savedQuery)); // Update the Redux state with the saved query
        }
    }, [dispatch]);

    const searchJobHandler = () => {
        // Save the query to localStorage
        localStorage.setItem('searchQuery', query);

        dispatch(setSearchedQuery(query)); // Dispatch query to Redux
        navigate("/browse"); // Navigate to browse page
    };

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        value={query}
                        className='outline-none border-none w-full h-10'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] h-15 w-15">
                        <Search className='h-100 w-100' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;*/

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Check if there is a search query in localStorage on page load
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setQuery(storedQuery);
      dispatch(setSearchedQuery(storedQuery)); // Optionally, set in Redux as well
    }
  }, [dispatch]);

  const searchJobHandler = () => {
    if (query.trim() !== "") {
      // Dispatch the query to Redux and navigate
      dispatch(setSearchedQuery(query));
      localStorage.setItem('searchQuery', query);  // Store the query in localStorage
      navigate(`/browse?query=${query}`);

      // Clear the query from state and localStorage after the search
      setQuery("");
      localStorage.removeItem('searchQuery');  // Optionally clear localStorage after search
    } else {
      // Handle case when query is empty
      toast.error("Please enter a search query.");
    }
  };
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p className="text-1xl font-semibold">Connecting talent with opportunity — your future begins here.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full h-10'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] h-15 w-15">
            <Search className='h-100 w-100' />
          </Button>
        </div>
        
      </div>
      
    </div>
  );
};

export default HeroSection;
