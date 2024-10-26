import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <nav className="flex justify-between items-center bg-gray-100 text-black px-6 py-3 shadow-md">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        {/* YouTube Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184A2.994 2.994 0 0017.5 3H6.5c-.823 0-1.606.336-2.115.933A2.983 2.983 0 003 6.5v11c0 .823.336 1.606.933 2.115A2.982 2.982 0 006.5 20h11c.823 0 1.606-.336 2.115-.933A2.982 2.982 0 0021 17.5v-11a2.99 2.99 0 00-1.385-2.316zM10 16V8l7 4-7 4z" />
        </svg>
        
        {/* YouTube Text */}
        <div className="text-2xl font-semibold text-red-600">
            You<span className="text-black">Tube</span>
            </div>
        </div>
            
            {/* Search Bar */}
            <div className="flex items-center w-1/4">
                <SearchBar />
            </div>
    
            {/* User Icons */}
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a7 7 0 00-7 7v3.65c0 .67-.26 1.31-.73 1.8L3 17h18l-1.27-2.55A2.5 2.5 0 0119 12.65V9a7 7 0 00-7-7zm1 17h-2a2 2 0 002 2h2a2 2 0 002-2h-2zm-1-3c1.1 0 2-.9 2-2H9c0 1.1.9 2 2 2z" />
                    </svg>
                </button>
    
                {/* Upload */}
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 15v-3H5l7-7 7 7h-5v3h-4zm-1 2h6v2H9z" />
                    </svg>
                </button>
    
                {/* Profile */}
                <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
