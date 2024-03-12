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
              <div className="bg-black rounded-lg">
                <button className="" onClick={onClose}>
                  <Image src="/death-star-bold.svg" alt="loading" width="40" height="40" />
                  <p className=" text-white font-bold relative -top-[40px] leading-[35px]">close</p>
                </button>
                <div className="grid grid-rows-6 auto-rows-min relative z-10 bg-st-hyper bg-cover bg-center rounded-b-lg">
                  <div className="row-span-1 bg-black">
                    <span className="text-white font-bold text-3xl flex items-center justify-center">{person.name}</span>
                  </div>
                  <div className="grid grid-cols-2 row-span-5 bg-gradient-to-b from-black to-transparent">
                  <Image 
                    src={"/"+person.id+"-removed.png"}
                    alt={person.name}
                    width={376}
                    height={376}
                    className="rounded-bl-lg"
                  />
                  <div className="text-white font-bold p-5">
                    <p>Height: {person.height}</p>
                    <p>Mass: {person.mass}</p>
                    <p>Birth year: {person.birth_year}</p>
                    {person.films?.map((film, index) => (
                      <p key={index}>Film {index + 1}: {film}</p>))}
                    <p>Homeplanet: {person.homeworldData?.name}</p>
                    <p>Terrain: {person.homeworldData?.terrain}</p>
                    <p>Climate: {person.homeworldData?.climate}</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};
  