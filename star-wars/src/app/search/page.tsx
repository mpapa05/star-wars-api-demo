'use client';

import { ChangeEvent, useState } from "react";
import { People, Person } from "../interfaces/people";
import Image from 'next/image'
import CharacterCard from "../components/character-card/character-card";
import CharacterModal from "../components/character-modal/character-modal";
import Link from "next/link";
import Loading from "../components/loading/loading";

export default function People() {
  const [searchString, setSearchString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<People>();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [homeworldFilter, setHomeworldFilter] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>, filterType: string) => {
    const value = event.target.value;
    if (filterType === 'gender') {
      setGenderFilter(value);
      const filteredResult = searchResult?.results?.filter((person: Person) => {
        return person.gender === value;
      });
    } else if (filterType === 'homeworld') {
      setHomeworldFilter(value);
      const filteredResult = searchResult?.results?.filter((person: Person) => {
        return person.homeworld === value;
      });
    }
  }
  

  const openModal = (person: Person) => {
    console.log(person.name);
    setSelectedPerson(person);
  }
  const closeModal = () => {
    setSelectedPerson(null);
  }

  const handleSearch = () => {
    // Implement your search logic here
    console.log(`Searching for: ${searchString}`);
    setIsLoading(true);
    // Make API request to SWAPI
    fetch(`https://swapi.dev/api/people/?search=${searchString}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSearchResult(data);
        setIsLoading(false);
        // Handle the data as needed
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <Link href="/">
                <button className='btn btn-blue'>Back to home</button>
            </Link>
            <Link href="/people">
                <button className='btn btn-blue'>Go to People</button>
            </Link>
    

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
      {/* Filter options */}
      <div>
        <label>Gender:</label>
        <select value={genderFilter} onChange={(e) => handleFilterChange(e, 'gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">unknown</option>
          <option value="n/a">n/a</option>
        </select>

        <label>Homeworld:</label>
        <select value={homeworldFilter} onChange={(e) => handleFilterChange(e, 'homeworld')}>
          <option value="">All</option>
          {/* Add options based on search results */}
        </select>
      </div>

      {/* Display filtered results */}


      {isLoading ? (
        <Loading />
          ) : (<>
      {searchResult?.results?.map((person: Person, index: number) => (
        <div key={index}>
          <div onClick={() => openModal(person)}>
            <CharacterCard name={person.name} id={person.url.substring(29).replace('/', '')} />
          </div>
        </div>
      ))}
      {selectedPerson && (
                <div className="z-50 absolute">
                    <CharacterModal person={selectedPerson} id={selectedPerson.url.substring(29).replace('/', '')} onClose={closeModal} />
                </div>
      )}
      </>)}
    </div>
    </div>
  );
}

