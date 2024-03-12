'use client';

import { useState, useEffect } from 'react';
import { People, Person } from '../interfaces/people';
import CharacterCard from '../components/character-card/character-card';
import CharacterModal from '../components/character-modal/character-modal';
import Loading from '../components/loading/loading';

export default function People() {
    const [peoplePageData, setPeoplePageData] = useState<People | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    async function fetchData(link: string) {
        setIsLoading(true);
        try {
            const response = await fetch(link, { method: 'GET' });
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
        setPeoplePageData({ ...data, results: updatedResult });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
    }

    useEffect(() => {
        fetchData("https://swapi.py4e.com/api/people/");
    }, []);

    const openModal = (person: Person) => {
        setSelectedPerson(person);
    }

    const closeModal = () => {
        setSelectedPerson(null);
    }

    if (!peoplePageData) {
        return <>
            <Loading />
        </>
    }
    
    return (
        <div className="container">
            {selectedPerson?.id && (
                <div className="z-50 absolute">
                    <CharacterModal person={selectedPerson} onClose={closeModal} />
                </div>
            )}
            <div className="grid grid-cols-5 gap-5 p-4">
            {isLoading ? (
                <Loading />
                ) : (
                    <>
                    {peoplePageData.results?.map((person: Person, index: number) => (
                    <div key={index}>
                        {person?.id && (
                        <div onClick={() => openModal(person)}>
                            <CharacterCard name={person.name} id={person.id} />
                        </div>)}
                    </div>
                    ))}
                    </>
            )}
            </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
            <button className={`btn ${peoplePageData.previous ? "btn-blue" : "btn-gray"}`} disabled={!peoplePageData.previous} onClick={() => fetchData(peoplePageData.previous)}>previous</button>
            <button className={`btn ${peoplePageData.next ? "btn-blue" : "btn-gray"}`} disabled={!peoplePageData.next} onClick={() => fetchData(peoplePageData.next)}>next</button>
        </div>
        </div>
    );
}