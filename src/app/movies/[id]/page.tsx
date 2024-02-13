import MovieImage from '@/components/ui/movies/image';
import BigImageSkeleton from '@/components/ui/skeletons/bigImage';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const getMovieById = async (id: number) => {
  try {

    // await new Promise((resolve) => setTimeout(resolve, 3000)); fake delay
    const response = await fetch(`${process.env.API_BASE_URL}movie/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      cache: 'force-cache',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  try {
    const movie = await getMovieById(id);
    return (
      <main>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-row gap-2">
            <Suspense fallback={ <BigImageSkeleton/> }>
              <MovieImage moviePath={movie.poster_path} movieTitle={movie.title} />
              </Suspense>

              <div className="w-6/12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{movie.title}</h1>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"></div>
                
                <p>{movie.overview}</p>
              </div>

            </div>

          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error:', error);
    notFound();
  }
}
