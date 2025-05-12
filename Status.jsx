import React from 'react'
import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'

const Status = () => {
  return (
    <div>
    <Navbar/>
    <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        {/* Applied Job Table   */}
        <AppliedJobTable />
      </div>
    </div>
  )
}

export default Status