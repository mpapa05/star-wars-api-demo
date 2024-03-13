import Image from 'next/image'

interface LoadingProps {
    message?: string;
}

export default function Loading({message = "Loading..."}: LoadingProps) {
    return (
        <div className="grid grid-rows-2 justify-items-center">
        <Image src="/bb8.svg" alt="loading" width="200" height="200" />
            <p>{message}</p>
        </div>
    )
}