import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './shared/Navbar'

const Roadmaps = () => {
  const [query, setQuery] = useState("career roadmap");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async (searchTerm) => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error(" YouTube API Key not loaded from .env!");
      return;
    }

    try {
      const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: searchTerm,
          key: apiKey,
          maxResults: 6,
          type: "video"
        }
      });

      setVideos(res.data.items);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> 

      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Career Roadmaps</h2>

        
        <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for roadmaps (e.g., frontend, AI, devops)"
            className="flex-1 px-4 py-2 border rounded-md shadow-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* 🎥 Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id.videoId} className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmaps;
