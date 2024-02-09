import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"

const MovieCard = ({movieId, movieImage, movieTitle, movieDescription}:
    {movieId: number;
    movieImage: string;
        movieTitle: string;
        movieDescription: string;
    }) => {
    return (
        
        <Card data-movie-id={movieId} >
            <img
                alt={movieTitle}
                className="object-cover w-full rounded-t-lg h-96"
                src={`https://image.tmdb.org/t/p/original${movieImage}`}
                style={{
                    objectFit: "cover",
                    overflow:"hidden",
                }}
            />
            <CardContent className="py-4">
                <CardTitle>{movieTitle}</CardTitle>
                <CardDescription>Note : {movieDescription}</CardDescription>
            </CardContent>
        </Card>
    )
}

export default MovieCard;

