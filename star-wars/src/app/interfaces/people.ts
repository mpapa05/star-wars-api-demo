export interface People {
    count: number;
    next: string;
    previous: string;
    results: Person[];
}

export interface SearchResult {
    message?: string;
    result: SearchPerson[];
}

export interface SearchPerson {
    description: string;
    properties: Person;
    uid: string;
    __v: number;
    _id: string;
}

export interface Person {
    id?: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}