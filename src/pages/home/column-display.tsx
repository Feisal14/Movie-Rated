import { Card, Grid } from "semantic-ui-react";
import { DisplayType } from "./home";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  realesed_date: string;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
}
//dd

const ColumnDisplay = (props: Props) => {
  const { data, displayType } = props;

  return (
    <Grid columns={3} stackable centerd verticlAlign="top" padded="vertically">
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
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
            />
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ColumnDisplay;
