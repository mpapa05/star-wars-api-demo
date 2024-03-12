import { Person } from '../../interfaces/people'
import Image from 'next/image'

interface ModalProps {
  person: Person;
  onClose: () => void;
}

export default function CharacterModal({ person, onClose }: ModalProps) {
  console.log(person)  
  return (
      <div className="fixed inset-0 flex bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] z-40">
            <div className="bg-black rounded-md">
                <button className="btn btn-blue" onClick={onClose}>
                  <Image src="/death-star-bold.svg" alt="loading" width="40" height="40" /><p>Close</p>
                </button>
                <Image 
                src={"/"+person.id+".jpg"}
                alt={person.name}
                width={200}
                height={200}
                className="mx-auto rounded-md backdrop-contrast-125"
            />
                <div className="text-white font-bold p-5">
                  <h2>Name: fejlécben {person.name}</h2>
                  <p>Height: {person.height}</p>
                  <p>Mass: {person.mass}</p>
                  <p>BirthDate</p>
                  <p>movienumbers: and then movies:</p>
                  {person.films?.map((film, index) => (
                  <p key={index}>Film {index + 1}: {film}</p>))}
                  <p>birthplace - planet name:</p>
                  <p>birthplace - planet terrain:</p>
                  <p>birthplace - planet climate:</p>
                 </div>
            </div>
        </div>
    </div>
  );
};
  