import Image from 'next/image'
export default function Loading() {
    return (
        <div className="grid grid-rows-2 justify-items-center">
        <Image src="/bb8.svg" alt="loading" width="200" height="200" />
        <p>Loading...</p>
        </div>
    )
}