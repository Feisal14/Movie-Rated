import {
  Grid,
  Header,
  Loader,
  Segment,
  Image,
  List,
  Accordion,
  Card,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchTvShowDetails from "./query";

export const TvShow = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Movie ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  const panels = data.seasons.map((season: any) => ({
    key: season.id,
    title: `Season ${season.season_number}`,
    content: {
      content: (
        <Card
          style={{ height: "70px" }}
          meta={season.air_data}
          description={`${season.episode_count} episodes`}
        />
      ),
    },
  }));

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header> {data.name}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>Created By:</List.Header>
                  {data.created_by
                    .map((creator: any) => creator.name)
                    .join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>Overview: </List.Header>
                  {data.overview}
                </List.Item>

                <List.Item>
                  <List.Header>Rating:</List.Header>
                  {data.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Genres:</List.Header>
                  {data.genres.map((genre: any) => genre.name).join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>Production Companies:</List.Header>
                  {data.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>Number of Seasons:</List.Header>
                  {data.number_of_seasons}
                </List.Item>
                <List.Item>
                  <List.Header>Number of Episodes:</List.Header>
                  {data.number_of_episodes}
                </List.Item>

                <List.Item>
                  <List.Header>Seasons: </List.Header>
                  <List.Description
                    style={{ height: "280px", overflowY: "scroll" }}
                  >
                    <Accordion defaultActiveIndex={0} panels={panels} styled />
                  </List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Spoken Languages:</List.Header>
                  {data.spoken_languages
                    .map((language: any) => language.name)
                    .join(", ")}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default TvShow;
