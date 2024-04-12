import { Card, Grid, Form, Label } from "semantic-ui-react";
import { DisplayType } from "./home";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  realesed_date: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;

  const [rating, setRating] = useState<number>(0);

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess: () => {
      toast.success("Rating Successfull");
    },
    onError: () => {
      toast.error("Rating Failed");
    },
  });
  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess: () => {
      toast.success("Rating Successfull");
    },
    onError: () => {
      toast.error("Rating Failed");
    },
  });

  const rate =
    displayType === DisplayType.MOVIES ? rateMovieMutation : rateTvShowMutation;

  return (
    <Grid columns={3} stackable centerd verticlAlign="top" padded="vertically">
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Link
              to={`/${
                displayType === DisplayType.MOVIES ? "movie" : "tvshow"
              }/${displayData.id}`}
            >
              <Card
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                header={
                  displayType === DisplayType.MOVIES
                    ? displayData.title
                    : displayData.name
                }
                meta={`Realersed Date: ${displayData.realesed_date} | Rating: ${displayData.vote_average}`}
                description={displayData.overview.slice(0, 300) + "...."}
              />{" "}
              {isRated && displayData.rating !== undefined && (
                <Label>Your Rating: {displayData.rating}</Label>
              )}{" "}
            </Link>
            <Form>
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    onChange={(e) => setRating(Number(e.target.value))}
                    action={{
                      color: "voilet",
                      lavelPosition: "right",
                      icon: "star",
                      content: "Rate",
                      onClick: () => rate(displayData.id),
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ColumnDisplay;
