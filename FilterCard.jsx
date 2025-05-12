import React from 'react';

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      {/* Heading on top */}
      <h1 className="font-bold text-lg mb-3">Filter Jobs</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by role, salary, description, title, company..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {/* Other filters can go here */}
    </div>
  );
};

export default FilterCard;
