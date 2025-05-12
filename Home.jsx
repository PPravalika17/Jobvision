/*import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
  useGetAllJobs();
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user?.role==='recruiter'){
        navigate("/admin/companies");
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer/>
     </div>
  )
}

export default Home;*/

import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
   /* <div className="relative min-h-screen overflow-hidden">
      
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg1.jpg')",
          backgroundSize: '100%',       // Zooms in the image
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.18)',     // Zoom-in effect
              // Optional: darken for contrast
        }}
      />
  
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
    </div>*/
    <div
  className="bg-cover  min-h-screen"
  style={{
    backgroundImage: "url('/bg1.jpg')",
    backgroundSize: 'cover',        // Ensures the image covers the full background
    backgroundPosition: 'center',   // Keeps the image centered
    backgroundRepeat: 'no-repeat',  // Prevents repeating the image
    filter: 'blur(0)',
  }}
>

      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
  
  
}

export default Home;
