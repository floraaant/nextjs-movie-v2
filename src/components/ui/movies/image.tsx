import Image from 'next/image';

export default async function MovieImage({moviePath, movieTitle}:
    {
    moviePath: string;
    movieTitle: string;
    }) {
      // await new Promise((resolve) => setTimeout(resolve, 30000)); 

        return(
            <div className="w-6/12 h-full rounded-lg overflow-hidden">
                        
            <Image
              src={`https://image.tmdb.org/t/p/original${moviePath}`}
              alt={movieTitle}
              width={1080}
              height={1920}
              priority={true}
            />
          </div>
        )
        
}

