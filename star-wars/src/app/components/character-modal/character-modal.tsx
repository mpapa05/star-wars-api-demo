import { Person } from '../../interfaces/people'
import Image from 'next/image'

interface ModalProps {
  person: Person;
  id: string;
  onClose: () => void;
}

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
                  <p>Film {index + 1}: {film}</p>
                ))}
            </div>
        </div>
      </div>
    );
  };
  