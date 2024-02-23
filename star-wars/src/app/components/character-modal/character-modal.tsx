import { Person } from '../../interfaces/people'
import Image from 'next/image'

interface ModalProps {
  person: Person;
  id: string;
  onClose: () => void;
}
type Movies = {
  [key: string]: string;
};
const movies: Movies = {
  "https://swapi.dev/api/films/1/": "A New Hope",
  "https://swapi.dev/api/films/2/": "The Empire Strikes Back",
  "https://swapi.dev/api/films/3/": "Return of the Jedi",
  "https://swapi.dev/api/films/4/": "The Phantom Menace",
  "https://swapi.dev/api/films/5/": "Attack of the Clones",
  "https://swapi.dev/api/films/6/": "Revenge of the Sith",
};

export default function CharacterModal({ person, id, onClose }: ModalProps) {
    return (
      <div className="fixed inset-0 flex bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] z-40">
            <div className="bg-white p-2 rounded">
                <button className='btn btn-blue' onClick={onClose}>
                  <Image src="/death-star-bold.svg" alt="loading" width="40" height="40" /><p>Close</p>
                </button>
                <Image 
                src={"/"+id+".jpg"}
                alt={person.name}
                width={200}
                height={200}
                className='mx-auto'
            />
                <h2>Name: {person.name}</h2>
                <p>Height: {person.height}</p>
                <p>Mass: {person.mass}</p>
                {person.films?.map((film, index) => (
                  <p>Film {index + 1}: {movies[film]}</p>
                ))}
            </div>
        </div>
      </div>
    );
  };
  