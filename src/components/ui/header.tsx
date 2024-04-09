'use client'
import Link from "next/link"
import { Movie } from '@/types/movie';
import { usePathname } from 'next/navigation'


export default function Header() {
    const pathname = usePathname()
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
                <FilmIcon className="h-6 w-6" />
                <span className="sr-only">MovieDB</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link className={`link ${pathname === '/' ? 'text-sm font-bold hover:underline underline-offset-4' : 'text-sm font-medium hover:underline underline-offset-4'}`} href="/">
                    Home
                </Link>
                <Link className={`link ${pathname === '/movies' ? 'text-sm font-bold hover:underline underline-offset-4' : 'text-sm font-medium hover:underline underline-offset-4'}`} href="/movies">
                    Movies
                </Link>
                <Link className={`link ${pathname === '/tv-shows' ? 'text-sm font-bold hover:underline underline-offset-4' : 'text-sm font-medium hover:underline underline-offset-4'}`} href="#">
                    TV Shows
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/search">
                    Search
                </Link>
            </nav>
        </header>)
}
function FilmIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 3v18" />
            <path d="M3 7.5h4" />
            <path d="M3 12h18" />
            <path d="M3 16.5h4" />
            <path d="M17 3v18" />
            <path d="M17 7.5h4" />
            <path d="M17 16.5h4" />
        </svg>
    )
}