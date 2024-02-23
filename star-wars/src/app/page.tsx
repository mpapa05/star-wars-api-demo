import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/people">
        <button className='btn btn-blue'>Go to People</button>
      </Link>
      <Link href="/search">
        <button className='btn btn-blue'>Go to Search</button>
      </Link>
      <h1>Welcome to Star Wars API demo!</h1>
    </div>
  )
}