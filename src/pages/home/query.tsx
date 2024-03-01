export const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVkYTJlODk3MTViYjdhODQ2ZGU0NWI2NzJiNzAyNSIsInN1YiI6IjYyNjliMWM4MDAxYmJkMTU0YjJlMmRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6n07ZWrNfY0aIasNrrz2KPPrnDjqQUpa6bwlvf_quA",
        },
      }
    );
    console.log(res);
    return res.json();
  };
  
  export const fetchTVShows = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVkYTJlODk3MTViYjdhODQ2ZGU0NWI2NzJiNzAyNSIsInN1YiI6IjYyNjliMWM4MDAxYmJkMTU0YjJlMmRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6n07ZWrNfY0aIasNrrz2KPPrnDjqQUpa6bwlvf_quA",
        },
      }
    );
    console.log(res);
    return res.json();
  };