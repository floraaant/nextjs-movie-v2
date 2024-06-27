import Link from "next/link"
import { Metadata } from 'next';
import SearchBar from "@/components/ui/searchbar";
import { getFilteredMovies, getLastMovies } from "@/lib/data";
import { Suspense } from "react";
import BigImageSkeleton from "@/components/ui/skeletons/bigImage";
import ShowTrendingMovies from "@/components/presets/trending-movies";
import { SkeletonCard } from "@/components/ui/skeletons/styledSkeletons";

export const metadata: Metadata = {
  title: 'Discover Your Next Favorite Movie or TV Show',
};


export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  // const query = searchParams?.query || '';
  // const data = await getLastMovies();
  // const searchResults = await getFilteredMovies(query);
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
            </div>
          </div>
        </section>
        <Suspense fallback={<SkeletonCard />}>
          <ShowTrendingMovies />
        </Suspense>
      </main>
    </div>
  );
}
