// import { notFound } from "next/navigation";

export default function CharacterDetails({
    params,
}: {
    params: {
        characterId: string
    };
}) {
    return (
        <div>
            <h1>Star Wars API / people / {params.characterId}</h1>
        </div>
    )
}