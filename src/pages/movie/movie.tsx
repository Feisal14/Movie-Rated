import { Grid, Header, Loader, Segment, Image, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchMovieDetails from "./query";

export const Movie = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Movie ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header> {data.title}</Header>
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
                  <List.Header>Is The Movie For Adults:</List.Header>
                  {data.adult ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Overview: </List.Header>
                  {data.overview}
                </List.Item>
                <List.Item>
                  <List.Header>Release Date: </List.Header>
                  {data.release_date}
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
                  <List.Header>Production Countries:</List.Header>
                  {data.production_countries
                    .map((country: any) => country.name)
                    .join(", ")}
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

export default Movie;
