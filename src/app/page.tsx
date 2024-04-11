import Link from "next/link"
import { Metadata } from 'next';
import MovieCard from "@/components/movies/movie-card";
import SearchBar from "@/components/ui/searchbar";
import { getFilteredMovies, getLastMovies } from "@/lib/data";
import { Suspense } from "react";
import BigImageSkeleton from "@/components/ui/skeletons/bigImage";

export const metadata: Metadata = {
  title: 'Discover Your Next Favorite Movie or TV Show',
};


export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || '';
  const data = await getLastMovies();
  const searchResults = await getFilteredMovies(query);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-16">
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
                <SearchBar />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
              {searchResults.map((Movie: any) => (
                <Suspense fallback={<BigImageSkeleton />} >
                  <Link href={`movies/${Movie.id}`} key={Movie.id}>
                    <MovieCard movieId={Movie.id} movieTitle={Movie.title} movieDescription={Movie.vote_average} movieImage={Movie.poster_path} />
                  </Link>
                </Suspense>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trending Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">

              {data.length > 0 ? (
                data.map((Movie: any) => (
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
