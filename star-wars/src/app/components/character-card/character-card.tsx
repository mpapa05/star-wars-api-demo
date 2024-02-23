import Image from 'next/image'

interface CardProps {
    name: string;
    id: string;
}

export default function CharacterCard({ name, id}: CardProps) {
    return (
        <div className='bg-sky-500/50 rounded-md pt-4 cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:brightness-125 duration-300 hover:font-black duration-300'>
            <Image 
                src={"/"+id+".jpg"}
                alt={name}
                width={200}
                height={200}
                className='rounded-md mx-auto'
            />
            <div className='grid grid-cols-1 content-center justify-items-center hover:font-black duration-300'>
                <h2>{name}</h2>
            </div>
        </div>
    )
}