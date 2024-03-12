export interface People {
    count: number;
    next: string;
    previous: string | null;
    results: Person[];
}

export interface Person {
    id?: string | undefined;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    homeworldData?: HomeworldCardData;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface PersonCardData {
    id: string;
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    films: string[];
    homeworldData: HomeworldCardData;
}

export interface HomeworldCardData {
    name: string;
    terrain: string;
    climate: string;
}
