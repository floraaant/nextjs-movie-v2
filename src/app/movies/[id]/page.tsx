import MovieImage from '@/components/ui/movies/image';
import BigImageSkeleton from '@/components/ui/skeletons/bigImage';
import { ClockIcon, CurrencyEuroIcon, FlagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const getMovieById = async (id: number) => {
  try {
    // fake delay
    // await new Promise((resolve) => setTimeout(resolve, 3000)); 
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
//    console.log(data)
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
        <section className="w-full py-12 md:py-8 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-row gap-6">
            <Suspense fallback={ <BigImageSkeleton/> }>
              <MovieImage moviePath={movie.poster_path} movieTitle={movie.title} />
              </Suspense>

              <div className="w-6/12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{movie.title}</h1>
                <ul className='flex gap-2 my-2 align-middle'>
                  {movie.genres.map((item:any) => (
                    <li className='py-0.5 px-2 rounded-full border border-blue-400 bg-blue-50 text-blue-600 text-xs hover:cursor-pointer' key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"></div>
                
                <p>{movie.overview}</p>
                <div className="flex gap-4 my-2">
                  <div className="flex gap-2 border border-grey-600 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg">
                    <CurrencyEuroIcon className="h-6 w-6"/>
                    {movie.revenue}
                  </div>
                  <div className="flex gap-2 border border-grey-600 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg">
                    <ClockIcon className="h-6 w-6"/>
                    {movie.runtime} min
                  </div>
                  <div className="flex gap-2 border border-grey-600 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg uppercase">
                    <FlagIcon className="h-6 w-6"/>
                    {movie.original_language}
                  </div>
                </div>
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
