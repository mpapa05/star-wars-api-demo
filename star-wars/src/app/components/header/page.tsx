'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Header() {
  const pathname = usePathname()
 
  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/people' ? 'active' : ''}`}
            href="/people"
          >
            People
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/search' ? 'active' : ''}`}
            href="/search"
          >
            Search
          </Link>
        </li>
      </ul>
    </nav>
  )
}