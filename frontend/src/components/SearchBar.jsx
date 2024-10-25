// frontend/src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="p-2 rounded-l-md border border-gray-300 focus:outline-none"
            />
            <button type="submit" className="bg-blue-500 p-2 rounded-r-md text-white">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
