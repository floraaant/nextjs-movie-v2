import { Suspense } from "react";
import BigImageSkeleton from "@/components/ui/skeletons/bigImage";
import Pagination from "@/components/ui/pagination";
import Link from "next/link"
import MovieCard from "@/components/movies/movie-card";
import { getMovies } from "@/lib/data";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default async function Movies({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const data = await getMovies(currentPage);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="">
                            <div className="flex flex-col justify-center space-y-4 w-full">
                                <div className="space-y-2 flex flex-row justify-between align-middle w-full">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none w-2/3">
                                        Discover Movies
                                    </h1>
                                    <div className="ml-auto">
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Trier par" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="popularity.asc">Moins populaire</SelectItem>
                                                <SelectItem value="popularity.desc">Plus populaire</SelectItem>
                                                <SelectItem value="revenue.asc">Moins de revenus</SelectItem>
                                                <SelectItem value="revenue.desc">Plus de revenus</SelectItem>
                                                <SelectItem value="primary_release_date.asc">Plus vieux</SelectItem>
                                                <SelectItem value="title.asc">De A à Z</SelectItem>
                                                <SelectItem value="title.desc">De Z à A</SelectItem>
                                                <SelectItem value="vote_average.asc">Moins bonne note</SelectItem>
                                                <SelectItem value="vote_average.desc">Plus bonne note</SelectItem>
                                           </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
                            <Suspense fallback={<BigImageSkeleton />} >
                                {data.map((Movie: any) => (
                                    <Link href={`movies/${Movie.id}`} key={Movie.id}>
                                        <MovieCard movieId={Movie.id} movieTitle={Movie.title} movieDescription={Movie.vote_average} movieImage={Movie.poster_path} />
                                    </Link>
                                ))}
                            </Suspense>
                        </div>
                    </div>
                    <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={200} />
                    </div>
                </section>
            </main>
        </div>
    );
}