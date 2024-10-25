import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const SearchResults = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('query');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/videos/search?query=${query}`);
                const data = await response.json();
                
                if (response.ok) {
                    setVideos(data);  // Assuming backend returns an array of video objects
                } else {
                    console.error("Error fetching videos:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [query]);

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
                <p>Loading...</p>
            ) : videos.length > 0 ? (
                videos.map((video, index) => <VideoCard key={index} video={video} />)
            ) : (
                <p>No results found for "{query}"</p>
            )}
        </div>
    );
};

export default SearchResults;
