// frontend/pages/VideoPlayback.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const VideoPlayback = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/videos/${id}`);
                const data = await response.json();
                setVideo(data);
                setComments(data.comments);
            } catch (error) {
                console.error("Failed to fetch video:", error);
            }
        };

        fetchVideo();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to comment.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/videos/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ text: newComment, userId: user.userData.id })
            });

            if (response.ok) {
                const updatedComments = await response.json();
                setComments(updatedComments);
                setNewComment("");
            }
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/videos/${id}/comments/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    userId: user.userData.id,
                    commentId: commentId,
                    text: editText
                })
            });

            if (response.ok) {
                const { comment } = await response.json();
                setComments((prevComments) =>
                    prevComments.map((c) => (c._id === comment._id ? comment : c))
                );
                setEditCommentId(null);
                setEditText("");
            }
        } catch (error) {
            console.error("Failed to edit comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/videos/${id}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId: user.userData.id })
            });

            if (response.ok) {
                const updatedComments = await response.json();
                setComments(updatedComments);
            }
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            <div className={`flex-1 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
                <Navbar />
                <div className="video-playback-container mx-auto p-6 lg:w-4/5 w-full">
                    {/* Video Section */}
                    {video && (
                        <div className="mb-8">
                            <video src={video.videoUrl} controls className="w-full rounded-lg shadow-md mb-4" />
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{video.title}</h1>
                            <p className="text-gray-700">{video.description}</p>
                            <div className="flex items-center space-x-4 text-gray-600 mt-4">
                                <span>{video.views} views</span>
                                <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-4">
                                <button className="text-gray-600 hover:text-red-600">👍 {video.likes.length}</button>
                                <button className="text-gray-600 hover:text-blue-600">👎 {video.dislikes.length}</button>
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="comments-section mt-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h3>
                        <form onSubmit={handleAddComment} className="flex mb-4">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-5 py-2 rounded-r-md hover:bg-red-700 transition duration-150"
                            >
                                Comment
                            </button>
                        </form>

                        {/* Comments List */}
                        {comments.map((comment) => (
                            <div key={comment._id} className="comment-card p-4 rounded-lg bg-gray-100 mb-4">
                                {editCommentId === comment._id ? (
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="flex-grow p-2 border rounded-md mr-2"
                                        />
                                        <button
                                            onClick={() => handleEditComment(comment._id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditCommentId(null)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-gray-700 mb-2">{comment.text}</p>
                                        {user?.userData?.id === comment.userId && (
                                            <div className="flex space-x-4 text-sm">
                                                <button
                                                    onClick={() => {
                                                        setEditCommentId(comment._id);
                                                        setEditText(comment.text);
                                                    }}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayback;
