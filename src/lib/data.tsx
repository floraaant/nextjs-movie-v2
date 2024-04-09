export async function getLastMovies () {
    try {
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

  export async function getFilteredMovies (query: string) {
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

  export async function getMovieById (id: number) {
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

  export async function getMovies (currentPage: number) {
    try {
      // fake delay
      // await new Promise((resolve) => setTimeout(resolve, 3000)); 
      const response = await fetch(`${process.env.API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${currentPage}&sort_by=popularity.desc`, {
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