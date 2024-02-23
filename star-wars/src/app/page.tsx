import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Star Wars API demo!</h1>
      <Link href="/people">
        <button className='btn btn-blue'>Go to People</button>
      </Link>
    </div>
  )
}