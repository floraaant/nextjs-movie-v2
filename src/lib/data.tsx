'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'


export async function getLastMovies() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${process.env.API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results.slice(0, 8);

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export async function getFilteredMovies(query: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/search/movie?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export async function getMovieById(id: number) {
  try {
    // fake delay 
    // await new Promise((resolve) => setTimeout(resolve, 3000)); 
    const response = await fetch(`${process.env.API_BASE_URL}movie/${id}?language=fr-FR`, {
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

export async function getMovies(currentPage: number, sortBy: string) {
  try {
    // fake delay
    // await new Promise((resolve) => setTimeout(resolve, 3000)); 
    const response = await fetch(`${process.env.API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${currentPage}&sort_by=${sortBy}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export async function addMovieToFavorite(formData: FormData) {
  const schema = z.object({
    id: z.coerce.number({
      invalid_type_error: 'Invalid Id',
    }),
  })

  const validatedFields = schema.safeParse({
    id: formData.get('id'),
  })
  console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      errors: validatedFields?.error?.flatten().fieldErrors,
      message: "Il manque des champs. Il est impossible de créer un utilisateur.",
    };
  }

  const { id } = validatedFields.data;

  const body = {
    fields: {
      id_favorite_group: 1,
      id_user: 0,
      id_movie: id,
    }
  }
  try {
    const response = await fetch(`${process.env.DB_BASE_URL}${process.env.DB_FAVORITES_TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DB_BEARER_TOKEN}`,
      },
      body: JSON.stringify(body),
    });


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    return {
      message: "Il y a eu une erreur lors de l'ajout aux favoris. Détails : " + error,
    };
  }
  revalidatePath(`/movies/${id}`);
  redirect(`/movies/${id}`);
}