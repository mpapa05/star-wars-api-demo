'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { People, Person } from '../interfaces/people';
import Image from 'next/image'
import CharacterCard from '../components/character-card/page';

export default function People() {
    const [peoplePageData, setPeoplePageData] = useState<People | null>();
    const [isLoading, setIsLoading] = useState(true);

    async function onHandleClick(link: string) {
        console.log('clicked', link);
        try {
            setIsLoading(true);
            const response = await fetch(link, { method: 'GET' });
            const data = await response.json();
    
            console.log(data);
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

    if (isLoading) {
        return (
            <>
            <Image src="/bb8.svg" alt="loading" width="200" height="200" /><p>Loading...</p>
            </>
        )
        ;
    }

    if (!peoplePageData) {
        return <p>No data yet...</p>;
    }
    
    return (
        <div>
            <Link href="/">
                <button >Back to home</button>
            </Link>
            <h1>Star Wars API / people</h1>
            <ul>
                {peoplePageData.results?.map((person: Person, index: number) => (
                    <li key={index}>
                            <p>{person.name}</p>
                            <p>{person.url.substring(29).replace('/', '')}</p>
                            <CharacterCard name={person.name} id={person.url.substring(29).replace('/', '')} children={undefined} />
                    </li>
                ))}
            </ul>
                <button onClick={() => onHandleClick(peoplePageData.previous)}>previous</button>
                <button onClick={() => onHandleClick(peoplePageData.next)}>next</button>
        </div>
    )
}