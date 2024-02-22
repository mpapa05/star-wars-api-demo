import Image from 'next/image'

export default function CharacterCard({name, id, children, ...props }) {
    return (
        <div>
            <h1>Character Card</h1>
            <Image 
                src={"/"+id+".jpg"}
                alt={name}
                width={200}
                height={200}
            />
        </div>
    )
}