'use client';

import { ChangeEvent, useEffect, useState } from "react";
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
  const [filters, setFilters] = useState<{ gender: string; homeworld: string }>({
    gender: '',
    homeworld: '',
  });
  const [filteredResults, setFilteredResults] = useState<Person[] | null>(null);
  const [uniqueHomeworlds, setUniqueHomeworlds] = useState<Set<string>>(new Set());
  type Homeworlds = {
    [key: string]: string;
  };
  const homeworlds: Homeworlds = {
    "https://swapi.dev/api/planets/1/": "Tatooine", 
    "https://swapi.dev/api/planets/2/": "Alderaan",
    "https://swapi.dev/api/planets/3/": "Yavin IV",
    "https://swapi.dev/api/planets/4/":"Hoth",
    "https://swapi.dev/api/planets/5/": "Dagobah",
    "https://swapi.dev/api/planets/6/": "Bespin",
    "https://swapi.dev/api/planets/7/":"Endor",
    "https://swapi.dev/api/planets/8/":"Naboo",
    "https://swapi.dev/api/planets/9/":"Coruscant",
    "https://swapi.dev/api/planets/10/":"Kamino",
    "https://swapi.dev/api/planets/11/":"Geonosis",
    "https://swapi.dev/api/planets/12/":"Utapau",
    "https://swapi.dev/api/planets/13/":"Mustafar",
    "https://swapi.dev/api/planets/14/":"Kashyyyk",
    "https://swapi.dev/api/planets/15/":"Polis Massa",
    "https://swapi.dev/api/planets/16/":"Mygeeto",
    "https://swapi.dev/api/planets/17/":"Felucia",
    "https://swapi.dev/api/planets/18/":"Cato Neimoidia",
    "https://swapi.dev/api/planets/19/":"Saleucami",
    "https://swapi.dev/api/planets/20/":"Stewjon",
    "https://swapi.dev/api/planets/21/":"Eriadu",
    "https://swapi.dev/api/planets/22/":"Corellia",
    "https://swapi.dev/api/planets/23/":"Rodia",
    "https://swapi.dev/api/planets/24/":"Nal Hutta",
    "https://swapi.dev/api/planets/25/":"Dantooine",
    "https://swapi.dev/api/planets/26/":"Bestine IV",
    "https://swapi.dev/api/planets/27/":"Ord Mantell",
    "https://swapi.dev/api/planets/28/":"unknown",
    "https://swapi.dev/api/planets/29/":"Trandosha",
    "https://swapi.dev/api/planets/30/":"Socorro",
    "https://swapi.dev/api/planets/31/":"Mon Cala",
    "https://swapi.dev/api/planets/32/":"Chandrila",
    "https://swapi.dev/api/planets/33/":"Sullust",
    "https://swapi.dev/api/planets/34/":"Toydaria",
    "https://swapi.dev/api/planets/35/":"Malastare",
    "https://swapi.dev/api/planets/36/":"Dathomir",
    "https://swapi.dev/api/planets/37/":"Ryloth",
    "https://swapi.dev/api/planets/38/":"Aleen Minor",
    "https://swapi.dev/api/planets/39/":"Vulpter",
    "https://swapi.dev/api/planets/40/":"Troiken",
    "https://swapi.dev/api/planets/41/": "Tund",
    "https://swapi.dev/api/planets/42/": "Haruun Kal",
    "https://swapi.dev/api/planets/43/": "Cerea",
    "https://swapi.dev/api/planets/44/": "Glee Anselm",
    "https://swapi.dev/api/planets/45/": "Iridonia",
    "https://swapi.dev/api/planets/46/": "Tholoth",
    "https://swapi.dev/api/planets/47/": "Iktotch",
    "https://swapi.dev/api/planets/48/": "Quermia",
    "https://swapi.dev/api/planets/49/": "Dorin",
    "https://swapi.dev/api/planets/50/": "Champala",
    "https://swapi.dev/api/planets/51/": "Mirial",
    "https://swapi.dev/api/planets/52/": "Serenno",
    "https://swapi.dev/api/planets/53/": "Concord Dawn",
    "https://swapi.dev/api/planets/54/": "Zolan",
    "https://swapi.dev/api/planets/55/": "Ojom",
    "https://swapi.dev/api/planets/56/": "Skako",
    "https://swapi.dev/api/planets/57/": "Muunilinst",
    "https://swapi.dev/api/planets/58/": "Shili",
    "https://swapi.dev/api/planets/59/": "Kalee",
    "https://swapi.dev/api/planets/60/": "Umbara",
  }
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
    const filteredResult = searchResult?.results?.filter((person: Person) => {
      const genderFilter = filters.gender === '' || person.gender === filters.gender;
      const homeworldFilter = filters.homeworld === '' || person.homeworld === filters.homeworld;

      return genderFilter && homeworldFilter;
    });

    setFilteredResults(filteredResult || null);
  };

  const clearFilters = () => {
    setFilters({ gender: '', homeworld: '' });
    setFilteredResults(null);
  };
  
  useEffect(() => {
    // Update unique homeworlds whenever search results change
    const homeworldSet = new Set<string>(searchResult?.results?.map((person: Person) => person.homeworld) || []);
    setUniqueHomeworlds(homeworldSet);
  }, [searchResult]);

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
    

      <div className="grid grid-rows-1">
        <div className="searchAndFilter grid grid-rows-1 place-content-center h-[270px]">

        
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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">unknown</option>
            <option value="n/a">n/a</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[200px]">Homeworld:</label>
          <select className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={filters.homeworld} onChange={(e) => handleFilterChange(e, 'homeworld')}>
            <option value="">All</option>
            {Array.from(uniqueHomeworlds).map((homeworld: string) => (
            <option key={homeworld} value={homeworld}>
              {homeworlds[homeworld]}
            </option>
            ))}
          </select>
          <button className='btn btn-blue' onClick={applyFilters}>Apply Filters</button>
          <button className='btn btn-blue' onClick={clearFilters}>Clear Filters</button>
        </div>
        </div>

        {/* Display filtered results */}


        {isLoading ? (
          <div className="grid grid-rows-1 place-content-center">
            <Loading />
          </div>
      ) : (
        <div className='grid grid-cols-5 gap-3 p-4'>
          {(filteredResults || searchResult?.results)?.map((person: Person, index: number) => (
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
        </div>
      )}
      </div>
    </div>
  );
}
