import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginRight: 20,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 20,
  },
});

export default function GridView(props) {

  const classes = useStyles();
  return (
    <div>

      {props ? (
        <Card className={classes.root} raised={true}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Images"
              height="140"
              image={props.urls}
              title={props.alt_description}
            />
          </CardActionArea>
        </Card>

      ) : null}
    </div>
  )
}
