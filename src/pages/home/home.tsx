import { useState } from "react";
import { Button } from "semantic-ui-react";
import ColumnDisplay from "./column-display";

import { fetchMovies, fetchTVShows } from "./query";
import { useQuery } from "@tanstack/react-query";

export enum DisplayType {
  MOVIES = "movies",
  TV = "tvshows",
}

export const home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.MOVIES
  );

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: tvShowsData, isLoading: isLoadingTVShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTVShows,
  });

  return (
    <div style={{ marginTop: 50, height: "auto" }}>
      <Button.Group>
        <Button
          color={displayType === DisplayType.MOVIES ? "violet" : undefined}
          onClick={() => setDisplayType(DisplayType.MOVIES)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TV ? "violet" : undefined}
          onClick={() => setDisplayType(DisplayType.TV)}
        >
          TV Shows
        </Button>
      </Button.Group>

      {isLoadingMovies || isLoadingTVShows ? (
        <div>Loading</div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.MOVIES ? (
            <ColumnDisplay
              data={movieData.results}
              displayType={DisplayType.MOVIES}
            />
          ) : (
            <ColumnDisplay
              data={tvShowsData.results}
              displayType={DisplayType.TV}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default home;
