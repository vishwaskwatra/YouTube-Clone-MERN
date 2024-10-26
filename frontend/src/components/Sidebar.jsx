import React from 'react';
import { FaBars, FaHome, FaFire, FaPlayCircle, FaFolderOpen, FaHistory, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate();

    return (
        <aside className={`bg-white text-gray-900 h-screen p-4 fixed ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 shadow-lg`}>
    <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="text-red-600 focus:outline-none mb-6"
    >
        <FaBars size={20} />
    </button>

    {/* Sidebar list */}
    <ul className="space-y-4">
        <li 
            className="flex items-center hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200" 
            onClick={() => navigate('/')}
        >
            <FaHome size={20} className="text-gray-800" />
            {!isCollapsed && <span className="ml-4">Home</span>}
        </li>
        <li className="flex items-center hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200">
            <FaFire size={20} className="text-gray-800" />
            {!isCollapsed && <span className="ml-4">Trending</span>}
        </li>
        <li className="flex items-center hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200">
            <FaPlayCircle size={20} className="text-gray-800" />
            {!isCollapsed && <span className="ml-4">Subscriptions</span>}
        </li>
        <li className="flex items-center hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200">
            <FaFolderOpen size={20} className="text-gray-800" />
            {!isCollapsed && <span className="ml-4">Library</span>}
        </li>
        <li 
            className="flex items-center hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200" 
            onClick={() => navigate('/channel')}
        >
            <FaUser size={20} className="text-gray-800" />
            {!isCollapsed && <span className="ml-4">Channel</span>}
        </li>
        <li className="flex items-center hover:bg-red-600 hover:text-white p-2 rounded-md cursor-pointer transition-colors duration-200">
            <FaHistory size={20} className="text-gray-800" />
            {!isCollapsed && <span className="ml-4">History</span>}
        </li>
    </ul>
</aside>

    );
};

export default Sidebar;
