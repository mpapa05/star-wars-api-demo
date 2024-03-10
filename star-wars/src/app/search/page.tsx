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
  type Homeworlds = {
    [key: string]: string;
  };
  const homeworlds: Homeworlds = {
    "https://swapi.tech/api/planets/1/": "Tatooine", 
    "https://swapi.tech/api/planets/2/": "Alderaan",
    "https://swapi.tech/api/planets/3/": "Yavin IV",
    "https://swapi.tech/api/planets/4/":"Hoth",
    "https://swapi.tech/api/planets/5/": "Dagobah",
    "https://swapi.tech/api/planets/6/": "Bespin",
    "https://swapi.tech/api/planets/7/":"Endor",
    "https://swapi.tech/api/planets/8/":"Naboo",
    "https://swapi.tech/api/planets/9/":"Coruscant",
    "https://swapi.tech/api/planets/10/":"Kamino",
    "https://swapi.tech/api/planets/11/":"Geonosis",
    "https://swapi.tech/api/planets/12/":"Utapau",
    "https://swapi.tech/api/planets/13/":"Mustafar",
    "https://swapi.tech/api/planets/14/":"Kashyyyk",
    "https://swapi.tech/api/planets/15/":"Polis Massa",
    "https://swapi.tech/api/planets/16/":"Mygeeto",
    "https://swapi.tech/api/planets/17/":"Felucia",
    "https://swapi.tech/api/planets/18/":"Cato Neimoidia",
    "https://swapi.tech/api/planets/19/":"Saleucami",
    "https://swapi.tech/api/planets/20/":"Stewjon",
    "https://swapi.tech/api/planets/21/":"Eriadu",
    "https://swapi.tech/api/planets/22/":"Corellia",
    "https://swapi.tech/api/planets/23/":"Rodia",
    "https://swapi.tech/api/planets/24/":"Nal Hutta",
    "https://swapi.tech/api/planets/25/":"Dantooine",
    "https://swapi.tech/api/planets/26/":"Bestine IV",
    "https://swapi.tech/api/planets/27/":"Ord Mantell",
    "https://swapi.tech/api/planets/28/":"unknown",
    "https://swapi.tech/api/planets/29/":"Trandosha",
    "https://swapi.tech/api/planets/30/":"Socorro",
    "https://swapi.tech/api/planets/31/":"Mon Cala",
    "https://swapi.tech/api/planets/32/":"Chandrila",
    "https://swapi.tech/api/planets/33/":"Sullust",
    "https://swapi.tech/api/planets/34/":"Toydaria",
    "https://swapi.tech/api/planets/35/":"Malastare",
    "https://swapi.tech/api/planets/36/":"Dathomir",
    "https://swapi.tech/api/planets/37/":"Ryloth",
    "https://swapi.tech/api/planets/38/":"Aleen Minor",
    "https://swapi.tech/api/planets/39/":"Vulpter",
    "https://swapi.tech/api/planets/40/":"Troiken",
    "https://swapi.tech/api/planets/41/": "Tund",
    "https://swapi.tech/api/planets/42/": "Haruun Kal",
    "https://swapi.tech/api/planets/43/": "Cerea",
    "https://swapi.tech/api/planets/44/": "Glee Anselm",
    "https://swapi.tech/api/planets/45/": "Iridonia",
    "https://swapi.tech/api/planets/46/": "Tholoth",
    "https://swapi.tech/api/planets/47/": "Iktotch",
    "https://swapi.tech/api/planets/48/": "Quermia",
    "https://swapi.tech/api/planets/49/": "Dorin",
    "https://swapi.tech/api/planets/50/": "Champala",
    "https://swapi.tech/api/planets/51/": "Mirial",
    "https://swapi.tech/api/planets/52/": "Serenno",
    "https://swapi.tech/api/planets/53/": "Concord Dawn",
    "https://swapi.tech/api/planets/54/": "Zolan",
    "https://swapi.tech/api/planets/55/": "Ojom",
    "https://swapi.tech/api/planets/56/": "Skako",
    "https://swapi.tech/api/planets/57/": "Muunilinst",
    "https://swapi.tech/api/planets/58/": "Shili",
    "https://swapi.tech/api/planets/59/": "Kalee",
    "https://swapi.tech/api/planets/60/": "Umbara",
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

  const handleSearch = () => {
    setIsLoading(true);
    fetch(`https://swapi.tech/api/people/?name=${searchString}`)
      .then(response => response.json())
      .then(data => {
        console.log(searchString, data);
        setSearchResult(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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
          <button className="btn btn-blue" onClick={applyFilters}>Apply Filters</button>
          <button className="btn btn-blue" onClick={clearFilters}>Clear Filters</button>
        </div>
        </div>

        {/* Display filtered results */}


        {isLoading ? (
          <div className="grid grid-rows-1 place-content-center">
            <Loading />
          </div>
      ) : (
        <div className='grid grid-cols-5 gap-3 p-4'>
          {(filteredResults || searchResult?.result)?.map((person: SearchPerson, index: number) => (
            <div key={index}>
              <div onClick={() => openModal(person.properties)}>
                <CharacterCard name={person.properties.name} id={person.properties.url.substring(33).replace('/', '')} />
              </div>
            </div>
          ))}
          {selectedPerson && (
            <div className="z-50 absolute">
              <CharacterModal person={selectedPerson} id={selectedPerson.url.substring(33).replace('/', '')} onClose={closeModal} />
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
