import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
            {/* Logo */}
            <div className="text-xl font-bold cursor-pointer" onClick={handleLogoClick}>
                MyTube
            </div>
            
            {/* Search Bar */}
            <div className="flex items-center justify-between">
                <SearchBar />
            </div>

            {/* User Icons */}
            <div className="flex items-center space-x-4">
                <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    Notifications
                </button>
                <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    Upload
                </button>
                <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    Profile
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
