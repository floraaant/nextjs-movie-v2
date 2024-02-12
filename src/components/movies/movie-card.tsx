import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import Image from "next/image";

const MovieCard = ({movieId, movieImage, movieTitle, movieDescription}:
    {movieId: number;
    movieImage: string;
        movieTitle: string;
        movieDescription: string;
    }) => {
    return (
        
        <Card data-movie-id={movieId} className="overflow-hidden hover:scale-105 transition-all">
            <Image
                alt={movieTitle}
                className="object-cover w-full rounded-t-lg h-96"
                src={`https://image.tmdb.org/t/p/original${movieImage}`}
                width={300}
                height={300}
            />
            <CardContent className="py-4">
                <CardTitle>{movieTitle}</CardTitle>
                <CardDescription>Note : {movieDescription}</CardDescription>
            </CardContent>
        </Card>
    )
}

export default MovieCard;

