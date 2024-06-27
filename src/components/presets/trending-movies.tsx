import { getLastMovies } from "@/lib/data";
import MovieCard from "@/components/movies/movie-card";
export default async function ShowTrendingMovies() {
    
    const data = await getLastMovies();
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trending Movies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">

                    {data.length > 0 ? (
                        data.map((Movie: any) => (
                            <MovieCard movieId={Movie.id} movieTitle={Movie.title} movieDescription={Movie.vote_average} movieImage={Movie.poster_path} />
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    )
}