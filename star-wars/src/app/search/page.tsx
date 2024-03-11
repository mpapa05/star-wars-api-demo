'use client';

import { ChangeEvent, useState } from "react";
import { People, Person, SearchPerson, SearchResult } from "../interfaces/people";
import CharacterCard from "../components/character-card/character-card";
import CharacterModal from "../components/character-modal/character-modal";
import Loading from "../components/loading/loading";

export default function People() {
  const [searchString, setSearchString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filters, setFilters] = useState<{ gender: string; homeworld: string }>({
    gender: '',
    homeworld: '',
  });
  const [filteredResults, setFilteredResults] = useState<SearchPerson[] | null>(null);
  const uniqueHomeworlds = new Set<string>(
    searchResult?.result?.map((person: SearchPerson) => person.properties.homeworld) || []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>, filterType: string) => {
    const value = event.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    const filteredResult = searchResult?.result?.filter((person: SearchPerson) => {
      const genderFilter = filters.gender === '' || person.properties.gender === filters.gender;
      const homeworldFilter = filters.homeworld === '' || person.properties.homeworld === filters.homeworld;

      return genderFilter && homeworldFilter;
    });

    setFilteredResults(filteredResult || null);
  };

  const clearFilters = () => {
    setFilters({ gender: '', homeworld: '' });
    setFilteredResults(null);
  };

  const openModal = (person: Person) => {
    setSelectedPerson(person);
  }
  const closeModal = () => {
    setSelectedPerson(null);
  }

  const handleSearch = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`https://www.swapi.tech/api/people/?name=${searchString}`);
      const data = await response.json();
      console.log(data)
  
      if (data.result.length > 0) {
        const updatedResult: SearchPerson[] = await Promise.all(
          data.result.map(async (person: SearchPerson) => {
            const homeworldUrl = person.properties.homeworld;
            const id = person.properties.url.split("/").pop();
            try {
              const homeworldResponse = await fetch(homeworldUrl);
              const homeworldData = await homeworldResponse.json();
              console.log(
                  person.properties,
                  homeworldData.result.properties.name)
              return {
                ...person,
                properties: {
                  ...person.properties,
                  id: id,
                  homeworld: homeworldData.result.properties.name,
                },
              };
            } catch (error) {
              console.error('Error fetching homeworld data:', error);
              return person;
            }
          })
        );
  
        setSearchResult(prevResult => ({
          ...prevResult,
          result: updatedResult,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      console.log(searchResult);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="grid grid-rows-1 place-content-center h-[270px]">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-l focus:outline-none max-h-[48px]"
          value={searchString}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-blue"
          onClick={handleSearch}
        >Search
        </button>
        {/* Filter options */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[200px]">Gender:</label>
          <select className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={filters.gender} onChange={(e) => handleFilterChange(e, 'gender')}>
            <option value="">Empty</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">unknown</option>
            <option value="n/a">n/a</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[200px]">Homeworld:</label>
          <select className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={filters.homeworld} onChange={(e) => handleFilterChange(e, 'homeworld')}>
            <option value="">Empty</option>
            {Array.from(uniqueHomeworlds).map((homeworld: string) => (
            <option key={homeworld} value={homeworld}>
              {homeworld}
              {/* {fetchPlanetName(homeworld)} */}
            </option>
            ))}
          </select>
          <button className="btn btn-blue" onClick={applyFilters}>Apply Filters</button>
          <button className="btn btn-blue" onClick={clearFilters}>Clear Filters</button>
        </div>
        </div>

        {/* Display filtered results */}

        {/* const id = person.properties.url.split("/").pop(), */}
        {isLoading ? (
          <div className="grid grid-rows-1 place-content-center">
            <Loading />
          </div>
      ) : (
        <div className='grid grid-cols-5 gap-5 p-4'>
          {(filteredResults || searchResult?.result)?.map((person: SearchPerson, index: number) => (
            <div key={index}>
              {person?.properties?.id && (
              <div onClick={() => openModal(person.properties)}>
                <CharacterCard name={person.properties.name} id={person.properties.id } />
              </div>)}
            </div>
          ))}
          {selectedPerson?.id && (
            <div className="z-50 absolute">
              <CharacterModal person={selectedPerson} id={selectedPerson.id} onClose={closeModal} />
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
