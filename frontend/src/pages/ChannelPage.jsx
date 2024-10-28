import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import VideoEditModal from '../components/VideoEditModal'; // Modal for editing

const ChannelPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchUserVideos();
        }
    }, [user, navigate]);

    const fetchUserVideos = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/videos/user/${user.userData.id}`,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        }
    };

    const handleEdit = (video) => {
        setSelectedVideo(video);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (videoId) => {
        try {
            await fetch(`http://localhost:5000/api/videos/${videoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setVideos(videos.filter((video) => video._id !== videoId));
        } catch (error) {
            console.error("Failed to delete video:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            <div className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
                <Navbar />
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Your Channel Videos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div key={video._id} className="bg-white p-4 rounded-lg shadow-md relative">
                            <img src={video.thumbnailUrl} alt={video.title} className="rounded-md mb-4" />
                            <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                            <div className="flex justify-between">
                                <button onClick={() => handleEdit(video)} className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(video._id)} className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for editing video */}
                {isEditModalOpen && (
                    <VideoEditModal
                        video={selectedVideo}
                        onClose={() => setIsEditModalOpen(false)}
                        onUpdate={(updatedVideo) => setVideos(
                            videos.map((video) =>
                                video._id === updatedVideo._id ? updatedVideo : video
                            )
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default ChannelPage;
