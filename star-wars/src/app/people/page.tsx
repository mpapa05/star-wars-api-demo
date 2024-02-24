'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { People, Person } from '../interfaces/people';
import Image from 'next/image'
import CharacterCard from '../components/character-card/character-card';
import CharacterModal from '../components/character-modal/character-modal';
import Loading from '../components/loading/loading';

export default function People() {
    const [peoplePageData, setPeoplePageData] = useState<People | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    async function onHandleClick(link: string) {
        try {
            setIsLoading(true);
            const response = await fetch(link, { method: 'GET' });
            const data = await response.json();
            
            setPeoplePageData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetch('https://swapi.dev/api/people/', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPeoplePageData(data);
                setIsLoading(false);
            });
    }, []);

    const openModal = (person: Person) => {
        console.log(person.name);
        setSelectedPerson(person);
    }

    const closeModal = () => {
        setSelectedPerson(null);
    }

    if (!peoplePageData) {
        return <>
            <Loading />
            <p>Waiting for data...</p>
        </>
    }
    
    return (
        <div className='container'>
            {selectedPerson && (
                <div className="z-50 absolute">
                    <CharacterModal person={selectedPerson} id={selectedPerson.url.substring(29).replace('/', '')} onClose={closeModal} />
                </div>
      )}
            <Link href="/">
                <button className='btn btn-blue'>Back to home</button>
            </Link>
            <Link href="/search">
                <button className='btn btn-blue'>Go to Search</button>
            </Link>
            <h1>Star Wars API / people</h1>


    {/* Conditionally render Loading component */}
    <div className='grid grid-cols-5 gap-3 p-4'>
    {isLoading ? (
            <Loading />
            ) : (
            <>
            {peoplePageData.results?.map((person: Person, index: number) => (
                <div key={index}>
                    <div onClick={() => openModal(person)}>
                        <CharacterCard name={person.name} id={person.url.substring(29).replace('/', '')} />
                    </div>
                </div>
            ))}
        </>
    )}
    </div>
    <div className='grid grid-cols-2 gap-3 mt-5'>
      <button className={`btn ${peoplePageData.previous ? 'btn-blue' : 'btn-gray'}`} disabled={!peoplePageData.previous} onClick={() => onHandleClick(peoplePageData.previous)}>previous</button>
      <button className={`btn ${peoplePageData.next ? 'btn-blue' : 'btn-gray'}`} disabled={!peoplePageData.next} onClick={() => onHandleClick(peoplePageData.next)}>next</button>
    </div>
  </div>
);
}