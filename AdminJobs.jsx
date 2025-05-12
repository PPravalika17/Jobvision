import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
//import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
//import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
   useGetAllAdminJobs();
    const [input,setInput]=useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[input]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Background Div */}
        <div
            style={{
                backgroundImage: "url('/bg4.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                position: 'absolute', 
                top: 0, 
                left: 0,
                right: 0,
                zIndex: -1,
                filter: 'blur(15px)' // Ensures the background stays behind the content
            }}
        />
        
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit bg-white"
                        placeholder="Filter by name,role"
                       onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} >New Job</Button>
                </div>
                <AdminJobsTable/>
            </div>
        </div>
    )
}

export default AdminJobs