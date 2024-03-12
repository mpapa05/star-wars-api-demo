'use client';

import { ChangeEvent, useState } from "react";
import { Person, People } from "../interfaces/people";
import CharacterCard from "../components/character-card/character-card";
import CharacterModal from "../components/character-modal/character-modal";
import Loading from "../components/loading/loading";

export default function People() {
  const [searchString, setSearchString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [People, setPeople] = useState<People>();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filters, setFilters] = useState<{ homeworld: string, film: string }>({
    homeworld: '',
    film: '',
  });
  const [filteredResults, setFilteredResults] = useState<Person[] | null>(null);
  const uniqueHomeworlds = new Set<string>(
    People?.results?.map((person: Person) => person.homeworld) || []
  );
  const uniqueFilms = new Set<string>(
    People?.results?.map((person: Person) => person.films || [])
    .flat()
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
    const filteredResult = People?.results?.filter((person: Person) => {
      const homeworldFilter = filters.homeworld === '' || person.homeworld === filters.homeworld;
      const filmsFilter = filters.film === '' || person.films.some(film => film === filters.film);
      return homeworldFilter && filmsFilter;
    });
    setFilteredResults(filteredResult || null);
  };

  const clearFilters = () => {
    setFilters({ homeworld: '', film: '' });
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
      const response = await fetch(`https://swapi.py4e.com/api/people/?search=${searchString}`);
      const data = await response.json();
  
      if (data.results.length > 0) {
        const updatedResult: Person[] = await Promise.all(
          data.results.map(async (person: Person) => {
            console.log(data);
            const homeworldUrl = person.homeworld;
            const moviesUrls = person.films;
            const match = person.url.match(/\/(\d+)\/$/);
            try {
              const homeworldResponse = await fetch(homeworldUrl);
              const homeworldData = await homeworldResponse.json();
              const moviesData = await Promise.all(moviesUrls.map(async (url: string) => {
              const response = await fetch(url);
                return await response.json();
              }));
              return {
                  ...person,
                  id: match ? match[1] : 'placeholder',
                  films: moviesData.map((movie: any) => movie.title),
                  homeworldData: {
                    name: homeworldData.name,
                    terrain: homeworldData.terrain,
                    climate: homeworldData.climate,
                  }
              };
            } catch (error) {
              console.error('Error fetching homeworld data:', error);
              return person;
            }
          })
        );
        setPeople({ ...data, results: updatedResult });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[200px]">Homeworld:</label>
          <select className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={filters.homeworld} onChange={(e) => handleFilterChange(e, 'homeworld')}>
            <option value="">Empty</option>
            {Array.from(uniqueHomeworlds).map((homeworld: string) => (
            <option key={homeworld} value={homeworld}>
              {homeworld}
            </option>
            ))}
          </select>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[200px]">Film:</label>
          <select className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={filters.film} onChange={(e) => handleFilterChange(e, 'film')}>
            <option value="">Empty</option>
            {Array.from(uniqueFilms).map((film: string) => (
            <option key={film} value={film}>
              {film}
            </option>
            ))}
          </select>
          <button className="btn btn-blue" onClick={applyFilters}>Apply Filters</button>
          <button className="btn btn-blue" onClick={clearFilters}>Clear Filters</button>
        </div>
        </div>

        {isLoading ? (
          <div className="grid grid-rows-1 place-content-center">
            <Loading />
          </div>
      ) : (
        <div className='grid grid-cols-5 gap-5 p-4'>
          {(filteredResults || People?.results)?.map((person: Person, index: number) => (
            <div key={index}>
              {person?.id && (
              <div onClick={() => openModal(person)}>
                <CharacterCard name={person.name} id={person.id} />
              </div>)}
            </div>
          ))}
          {selectedPerson?.id && (
            <div className="z-50 absolute">
              <CharacterModal person={selectedPerson} onClose={closeModal} />
            </div>
          )}
        </div>
      )}
      
      </div>
    </div>
  );
}
