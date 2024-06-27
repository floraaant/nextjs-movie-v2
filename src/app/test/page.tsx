
import { Button } from '@/components/ui/button';
import { addMovieToFavorite, getMovieById } from '@/lib/data';
import { SubmitButton } from './submit';

export default async function Test() {
    return (
        <>
         <form action={ addMovieToFavorite }>
            <SubmitButton />
            </form>
        </>
        )
}