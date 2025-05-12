
/*import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs*/
// useGetAllJobs.js

/*

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
 
  const { searchedQuery } = useSelector((state) => state.job); 
  useEffect(() => {
    const fetchJobs = async () => {
      const query = searchedQuery || '';
     
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${query}`,{withCredentials:true});
        if(res.data.success){
            dispatch(setAllJobs(res.data.jobs));
        }
    } catch (error) {
        console.log(error);
    }
    };

    fetchJobs();
  }, [dispatch, searchedQuery]);  // Ensure to add searchedQuery as a dependency to refetch when it changes
};

export default useGetAllJobs;
*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
const useGetAllJobs = (query = '') => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${query}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchJobs();
    }, [dispatch, query]);
  };
  
  export default useGetAllJobs;
  