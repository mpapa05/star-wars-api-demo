import Image from 'next/image'

interface LoadingProps {
    message?: string;
    src?: string;
}

export default function Loading({message = "Loading...", src="/bb8.svg"}: LoadingProps) {
    return (
        <div className="grid grid-rows-2 justify-items-center">
        <Image src={src} alt="loading" width="200" height="200" />
            <p>{message}</p>
        </div>
    )
}