import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Star Wars API / people</h1>
      <Link href="/people">
        <button >Go to People</button>
      </Link>
    </div>
  )
}