import { useState } from "react";
import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react";
import { DisplayType } from "../home/home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTv } from "./query";
import ColumnsDisplay from "../home/column-display";

const Rated = () => {
  const [activeTaps, setActiveTaps] = useState<DisplayType>(DisplayType.MOVIES);

  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });

  const { data: ratedTv, isLoading: isLoadingRatedTV } = useQuery({
    queryKey: ["fetchRatedTv"],
    queryFn: fetchRatedTv,
  });

  if (isLoadingRatedMovies || isLoadingRatedTV) {
    return <Loader active />;
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTaps === DisplayType.MOVIES}
          onClick={() => setActiveTaps(DisplayType.MOVIES)}
        />
        <Menu.Item
          name="TV Shows"
          active={activeTaps === DisplayType.TV}
          onClick={() => setActiveTaps(DisplayType.TV)}
        />
      </Menu>

      <Segment>
        <div>
          <Header as={"h2"}>Rated </Header>
          {activeTaps === DisplayType.MOVIES &&
            ratedMovies &&
            ratedMovies.results && (
              <ColumnsDisplay
                data={ratedMovies.results}
                displayType={DisplayType.MOVIES}
                isRated
              />
            )}
          {activeTaps === DisplayType.TV && ratedTv && ratedTv.results && (
            <ColumnsDisplay
              data={ratedTv.results}
              displayType={DisplayType.TV}
              isRated
            /> 
          )}
        </div>
      </Segment>
    </Container>
  );
};

export default Rated;
