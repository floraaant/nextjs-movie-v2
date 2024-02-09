import { notFound } from 'next/navigation';

const getMovieById = async (id: number) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}movie/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;  // Retourne l'objet de film complet, pas seulement data.results

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  try {
    const movie = await getMovieById(id);
    console.log(movie);

    return (
      <main>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        {/* Ajoutez d'autres éléments JSX pour afficher les détails du film */}
      </main>
    );
  } catch (error) {
    console.error('Error:', error);
    notFound();
  }
}
