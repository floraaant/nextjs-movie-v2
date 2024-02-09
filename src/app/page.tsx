import Link from "next/link"
import { Metadata } from 'next';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import MovieCard from "@/components/movies/movie-card";
import { Movie } from '@/types/movie'; 

export const metadata: Metadata = {
  title: 'Discover Your Next Favorite Movie or TV Show',
};

const getLastMovies = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
    
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export default async function Home() {
  const data = await getLastMovies();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <FilmIcon className="h-6 w-6" />
          <span className="sr-only">MovieDB</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Movies
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            TV Shows
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Favorites
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Next Favorite Movie or TV Show
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Search our extensive database of movies and TV shows. Find new favorites, rediscover classics, and
                    see what's trending.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Input className="max-w-lg flex-1" placeholder="Search for a movie or TV show..." type="text" />
                  <Button className="w-full md:w-auto" type="submit">
                    Discover
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trending Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {data.length > 0 ? (
                data.map((Movie:any) => (
                  <Link href={`movies/${Movie.id}`}>
                    <MovieCard movieId={Movie.id} movieTitle={Movie.title} movieDescription={Movie.vote_average} movieImage={Movie.poster_path} />
                    </Link>
                ))
              ) : (
                <p>Loading...</p>
              )}

            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recommended For You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              <Card>
                <img
                  alt="Movie Poster"
                  className="object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardContent>
                  <CardTitle>Movie Title</CardTitle>
                  <CardDescription>Rating: 8.5/10</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Movie Poster"
                  className="object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardContent>
                  <CardTitle>Movie Title</CardTitle>
                  <CardDescription>Rating: 7.2/10</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Movie Poster"
                  className="object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardContent>
                  <CardTitle>Movie Title</CardTitle>
                  <CardDescription>Rating: 9.1/10</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Movie Poster"
                  className="object-cover"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardContent>
                  <CardTitle>Movie Title</CardTitle>
                  <CardDescription>Rating: 8.3/10</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
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