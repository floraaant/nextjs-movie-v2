import Link from "next/link"
import { Metadata } from 'next';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import MovieCard from "@/components/movies/movie-card";

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
       next: { revalidate: 3600 },
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
                  <Link href={`movies/${Movie.id}`} key={Movie.id}>
                    <MovieCard movieId={Movie.id} movieTitle={Movie.title} movieDescription={Movie.vote_average} movieImage={Movie.poster_path} />
                    </Link>
                ))
              ) : (
                <p>Loading...</p>
              )}

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
