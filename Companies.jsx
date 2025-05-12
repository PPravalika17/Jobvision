/*import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'
const Companies = () => {
    const { loading } = useGetAllCompanies(); // Get loading from hook
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        onClick={() => navigate("/admin/companies/create")} 
                        disabled={loading} // Disable during loading
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}


export default Companies
*/

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch, useSelector } from 'react-redux'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { companies } = useSelector(store => store.company);

    // Check if any company is created already
    const isCompanyCreated = companies && companies.length > 0;

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div style={{
            backgroundImage: "url('/bg3.jpeg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh'
          }}>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md mt-40'>
                <div className='flex items-center justify-between my-5 '>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {/* Disable the button if company is already created */}
                    <Button 
                        onClick={() => navigate("/admin/companies/create")} 
                        disabled={isCompanyCreated}
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
