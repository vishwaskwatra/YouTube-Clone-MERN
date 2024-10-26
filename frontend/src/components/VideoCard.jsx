import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/video/${video._id}`); // Navigate to video playback page
    };

    return (
        <div onClick={handleCardClick} className="cursor-pointer border rounded-lg overflow-hidden">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-2">
                <h3 className="font-bold">{video.title}</h3>
                <p>{video.uploaderName}</p>
                <p>{video.views} views</p>
                <p>{video.uploadDate}</p>
            </div>
        </div>
    );
};

export default VideoCard;
