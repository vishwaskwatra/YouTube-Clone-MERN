import React, { useState } from 'react';

const VideoEditModal = ({ video, onClose, onUpdate }) => {
    const [title, setTitle] = useState(video.title);
    const [description, setDescription] = useState(video.description);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/videos/${video._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, description })
            });
            const updatedVideo = await response.json();
            onUpdate(updatedVideo);
            onClose();
        } catch (error) {
            console.error("Failed to update video:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="text-gray-600 hover:underline">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
};

export default VideoEditModal;
