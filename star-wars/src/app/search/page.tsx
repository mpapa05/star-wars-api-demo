'use client';

import { useState } from "react";

export default function People() {
const [searchString, setSearchString] = useState<string>('');

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

const handleSearch = () => {
    // Implement your search logic here
    console.log(`Searching for: ${searchString}`);
  };
//   filter: https://swapi.dev/api/people/?gender=male&name=Luke
//   filter: https://swapi.dev/api/people/?gender=male

return (
    <div className="flex items-center">
            <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-l focus:outline-none"
                value={searchString}
                onChange={handleInputChange}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r"
                onClick={handleSearch}
            >
            Search
            </button>
        </div>
);
}