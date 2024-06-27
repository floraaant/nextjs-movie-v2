import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link"


const MovieCard = ({ movieId, movieImage, movieTitle, movieDescription }:
    {
        movieId: number;
        movieImage: string;
        movieTitle: string;
        movieDescription: string;
    }) => {
    return (
        <div key={movieId}>
        <Link href={`movies/${movieId}`}>
            <Card data-movie-id={movieId} className="overflow-hidden hover:scale-105 transition-all">
                <Image
                    alt={movieTitle}
                    className="object-cover w-full rounded-t-lg h-96"
                    src={`https://image.tmdb.org/t/p/w500${movieImage}`}
                    width={300}
                    height={300}
                />
                <CardContent className="py-4">
                    <CardTitle>{movieTitle}</CardTitle>
                    <CardDescription>Note : {movieDescription}</CardDescription>
                </CardContent>
            </Card>
        </Link>
        </div>
    )
}

export default MovieCard;

