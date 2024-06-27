import { SubmitButton } from '@/app/test/submit';
import { FavoriteToast } from '@/components/ui/movies/favorite';
import MovieImage from '@/components/ui/movies/image';
import { SkeletonImage } from '@/components/ui/skeletons/styledSkeletons';
import { addMovieToFavorite, getMovieById } from '@/lib/data';
import { ClockIcon, CurrencyEuroIcon, FlagIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const movie = await getMovieById(id);
  try {
    return (
      <main>
        <section className="w-full py-12 md:py-8 lg:py-16 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-row gap-6">
              <Suspense fallback={<SkeletonImage />}>
                <MovieImage moviePath={movie.poster_path} movieTitle={movie.title} />
              </Suspense>

              <div className="w-6/12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{movie.title}</h1>
                <ul className='flex gap-2 my-2 align-middle'>
                  {movie.genres.map((item: any) => (
                    <li className='py-0.5 px-2 rounded-full border border-blue-400 bg-blue-50 text-blue-600 text-xs hover:cursor-pointer' key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"></div>

                <p>{movie.overview}</p>
                <div className="flex gap-4 my-2">
                  <div className="flex gap-2 border border-grey-600 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg">
                    <CurrencyEuroIcon className="h-6 w-6" />
                    {movie.revenue}
                  </div>
                  <div className="flex gap-2 border border-grey-600 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg">
                    <ClockIcon className="h-6 w-6" />
                    {movie.runtime} min
                  </div>
                  <div className="flex gap-2 border border-grey-600 bg-gray-50 text-gray-500 px-3 py-2 rounded-lg uppercase">
                    <FlagIcon className="h-6 w-6" />
                    {movie.original_language}
                  </div>
                </div>
                <div className="flex py-4">
                  <FavoriteToast/>
                  <form action={ addMovieToFavorite }>
                    <input type="hidden" name="id" value={movie.id} />
                    <SubmitButton />
                    </form>
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
