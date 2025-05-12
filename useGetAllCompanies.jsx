/*
import { setCompanies, setSingleCompany } from '@/redux/companySlice'
//import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = (companyId) => {
    const dispatch = useDispatch();
    //const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies
*/

import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
const useGetAllCompanies = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [dispatch]);

    return { loading, error, refetch: fetchCompanies };
};


export default useGetAllCompanies;
