
import React from 'react';
import { object } from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FLYER_TYPE } from '../../flyer-item/constants';


const useStyles = makeStyles({
  card: {
    width: '100%',
  },
  cardContainer: {
    marginTop: 16,
  },
});

export default function CardItem({ pet }) {
  const {
    id, petName, photoUrl, flyerType, description,
  } = pet;
  const classes = useStyles();
  const history = useHistory();
  const typeText = flyerType === FLYER_TYPE.lost ? 'lost' : 'found';

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push(`/flyer?type=${typeText}&id=${id}`)}>
          <CardMedia
            component="img"
            alt="My pet"
            height="140"
            image={photoUrl}
            title="My pet"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {petName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Compartir
          </Button>
          <Button size="small" color="primary">
            Ver mas info
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

CardItem.propTypes = {
  pet: object,
};
