import React, { useState } from "react";

const SearchBar = ({
  onSearch,
  onExecuteSearch,
  dropdownSuggestions,
  filterCategory,
  onFilterCategoryChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Update suggestions as user types
  };

  const handleSearchClick = () => {
    onExecuteSearch(searchTerm); // Execute search with current search term
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <select
          value={filterCategory}
          onChange={(e) => onFilterCategoryChange(e.target.value)}
          className="w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        />

        <button
          onClick={handleSearchClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium shadow-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>

      {/* Dropdown Suggestions */}
      {dropdownSuggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
          {dropdownSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                setSearchTerm(suggestion);
                onExecuteSearch(suggestion);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-200"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
