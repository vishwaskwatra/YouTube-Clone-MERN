// frontend/components/Sidebar.jsx
import React from 'react';
import { FaBars, FaHome, FaFire, FaPlayCircle, FaFolderOpen, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate();

    return (
        <aside className={`bg-gray-800 text-white h-screen p-4 fixed ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
            {/* Hamburger Icon */}
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className="text-white focus:outline-none mb-6"
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar Items */}
            <ul className="space-y-4">
                <li 
                    className="flex items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer" 
                    onClick={() => navigate('/')}
                >
                    <FaHome size={20} />
                    {!isCollapsed && <span className="ml-4">Home</span>}
                </li>
                <li className="flex items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                    <FaFire size={20} />
                    {!isCollapsed && <span className="ml-4">Trending</span>}
                </li>
                <li className="flex items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                    <FaPlayCircle size={20} />
                    {!isCollapsed && <span className="ml-4">Subscriptions</span>}
                </li>
                <li className="flex items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                    <FaFolderOpen size={20} />
                    {!isCollapsed && <span className="ml-4">Library</span>}
                </li>
                <li className="flex items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                    <FaHistory size={20} />
                    {!isCollapsed && <span className="ml-4">History</span>}
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
