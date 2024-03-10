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
        try {
            setIsLoading(true);
            console.log(link)
            const response = await fetch(link, { method: 'GET' });
            const data = await response.json();
            
            setPeoplePageData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData("https://swapi.tech/api/people/");
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
            {selectedPerson && (
                <div className="z-50 absolute">
                    <CharacterModal person={selectedPerson} id={selectedPerson.url.substring(33).replace('/', '')} onClose={closeModal} />
                </div>
      )}
    <div className="grid grid-cols-5 gap-3 p-4">
    {isLoading ? (
            <Loading />
            ) : (
            <>
            {peoplePageData.results?.map((person: Person, index: number) => (
                <div key={index}>
                    <div onClick={() => openModal(person)}>
                        <CharacterCard name={person.name} id={person.url.substring(33).replace('/', '')} />
                    </div>
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