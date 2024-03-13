"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Person, People } from "../interfaces/people";
import CharacterCard from "../components/character-card/character-card";
import CharacterModal from "../components/character-modal/character-modal";
import Loading from "../components/loading/loading";

export default function People() {
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<People>();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filters, setFilters] = useState<{ homeworld: string; film: string }>({
    homeworld: "",
    film: "",
  });
  const [filteredResults, setFilteredResults] = useState<Person[] | null>(null);
  const uniqueHomeworlds = Array.from(new Set(
    people?.results?.map((person: Person) => person.homeworldData?.name)
  ) || []);
  const uniqueFilms = new Set<string>(
    people?.results?.map((person: Person) => person.films || []).flat()
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleFilterChange = (
    event: ChangeEvent<HTMLSelectElement>,
    filterType: string
  ) => {
    const value = event.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const applyFilters = useCallback(() => {
    const filteredResult = people?.results?.filter((person: Person) => {
      const homeworldFilter =
        filters.homeworld === "" || person.homeworldData.name === filters.homeworld;
      const filmsFilter =
        filters.film === "" ||
        person.films.some((film) => film === filters.film);
      return homeworldFilter && filmsFilter;
    });
    setFilteredResults(filteredResult || null);
  }, [people?.results, filters.film, filters.homeworld]);

  useEffect(() => applyFilters(), [filters, applyFilters]);

  const clearFilters = () => {
    setFilters({ homeworld: "", film: "" });
    setFilteredResults(null);
  };

  const openModal = (person: Person) => {
    setSelectedPerson(person);
  };
  const closeModal = () => {
    setSelectedPerson(null);
  };

  async function fetchData(link: string) {
    try {
      const response = await fetch(link, { method: "GET" });
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error, link);
    }
  }

  const handleApiRequest = useCallback(async (link: string) => {
    setIsLoading(true);
    const data = await fetchData(link);

    if (data.results.length > 0) {
      const updatedResult: Person[] = await Promise.all(
        data.results.map(async (person: Person) => {
          const homeworldUrl = person.homeworld;
          const moviesUrls = person.films;
          const match = person.url.match(/\/(\d+)\/$/);
          const homeworldData = await fetchData(homeworldUrl);
          const moviesData = await Promise.all(
            moviesUrls.map(async (movieUrl: string) => {
              return fetchData(movieUrl);
            })
          );
          return {
            ...person,
            id: match ? match[1] : "placeholder",
            films: moviesData.map((movie: any) => movie.title),
            homeworldData: {
              name: homeworldData.name,
              terrain: homeworldData.terrain,
              climate: homeworldData.climate,
            },
          };
        })
      );
      setPeople({ ...data, results: updatedResult });

      setIsLoading(false);
    } else {
      console.log("No results found.", !!filteredResults, filteredResults, people?.results);
    }
  }, []);

  useEffect(() => {
    handleApiRequest("https://swapi.py4e.com/api/people/");
  }, [handleApiRequest]);

  return (
    <div className="grid place-items-center">
        <div className="grid grid-rows-4 gap-1 md:grid-cols-4 md:grid-rows-1 md:gap-2 max-w-[1024px]">
          <div className="pl-4 md:ps-4 ">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-l focus:outline-none max-h-[48px] w-[93%]"
              value={searchString}
              onChange={handleInputChange} />
            <button
            className="btn btn-blue relative w-[93%] pe-4"
            onClick={() =>
              handleApiRequest(
                `https://swapi.py4e.com/api/people/?search=${searchString}`
              )
            }
          >
            Search
            </button>
          </div>
          <div className="px-4 md:px-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 max-w-[200px]">
              Homeworld:
            </label>
            <select
              className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={filters.homeworld}
              onChange={(e) => handleFilterChange(e, "homeworld")}
            >
              <option value="">Empty</option>
              {uniqueHomeworlds.map((homeworld: string) => (
                <option key={homeworld} value={homeworld}>
                  {homeworld}
                </option>
              ))}
            </select>
          </div>
          <div className="px-4 md:px-0">
            <label className="block mb-2 text-sm font-medium text-gray-900 max-w-[200px]">
              Film:
            </label>
            <select
              className="max-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={filters.film}
              onChange={(e) => handleFilterChange(e, "film")}
            >
              <option value="">Empty</option>
              {Array.from(uniqueFilms).map((film: string) => (
                <option key={film} value={film}>
                  {film}
                </option>
              ))}
            </select>
          </div>
          <div className="px-4">
            <button className="btn btn-blue h-[40px] block relative top-0 md:top-[29px] w-[100%]" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
        
        {isLoading && people?.results ? (
          <div className="grid grid-rows-1 place-content-center">
            <Loading />
          </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 p-4 max-w-[1024px]">
            {(filteredResults || people?.results)?.map(
              (person: Person, index: number) => (
                <div key={index}>
                  {person?.id && (
                    <div onClick={() => openModal(person)}>
                      <CharacterCard name={person.name} id={person.id} />
                    </div>
                  )}
                </div>
              )
            )}
            {selectedPerson?.id && (
              <div className="z-50 absolute">
                <CharacterModal person={selectedPerson} onClose={closeModal} />
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-5 max-w-[1024px]">
          <button
            className={`btn ${people?.previous ? "btn-blue" : "btn-gray"}`}
            disabled={!people?.previous}
            onClick={() =>
              people?.previous && handleApiRequest(people?.previous)
            }
          >
            previous
          </button>
          <button
            className={`btn ${people?.next ? "btn-blue" : "btn-gray"}`}
            disabled={!people?.next}
            onClick={() => people?.next && handleApiRequest(people?.next)}
          >
            next
          </button>
        </div>
        
    </div>
  );
}
