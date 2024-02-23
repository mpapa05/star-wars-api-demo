import Image from 'next/image'
export default function Loading() {
    return (
        <>
        <Image src="/bb8.svg" alt="loading" width="200" height="200" /><p>Loading...</p>
        </>
    )
}