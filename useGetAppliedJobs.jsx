import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        } else {
          setError("Failed to fetch applied jobs.");  // Handle if API response is not successful
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching applied jobs.");
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

    fetchAppliedJobs();

    return () => {
      // Optional cleanup if needed
      // You can cancel the axios request here if necessary.
    };
  }, [dispatch]);

  return { loading, error };
};

export default useGetAppliedJobs;
