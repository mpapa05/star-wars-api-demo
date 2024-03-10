'use client';
import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
 
export function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname()
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link className={`link ${pathname === '/' ? "flex items-center disabled" : "flex items-center text-black"}`} href="/">
          Home
        </Link>
      </Typography>
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >

        <Link className={`link ${pathname === '/people' ? "flex items-center disabled" : "flex items-center text-black"}`} href="/people">
          People
        </Link>
      </Typography>
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >

        <Link className={`link ${pathname === '/search' ? "flex items-center disabled" : "flex items-center text-black"}`} href="/search">
          Search
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="mx-auto px-4 py-2 lg:px-8 lg:py-4" placeholder="">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          placeholder=""
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium text-black"
        >
          Star Wars API
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <IconButton
          placeholder=""
          color="black"
          variant="text"
          className="ml-auto h-6 w-6 -mt-[20px] text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      {openNav ? (<Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
        </div>
      </Collapse>) : null}
    </Navbar>
  );
}