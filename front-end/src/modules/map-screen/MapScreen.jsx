import React from 'react';
import {
  shape, number, func, array,
} from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import compose from 'lodash/fp/compose';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import { MapWrapper } from './components/styled';
import UserActions from '../common/UserActions';
import { withContext } from '../common/context';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const SimpleMap = ({
  zoom,
  coords,
  fetchMapFlyers,
  mapFlyers = [],
}) => {
  const mapCoords = coords || {
    latitude: -31.409690,
    longitude: -64.188881,
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [focusedFlyer, setFocusedFlyer] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = flyerId => event => {
    setAnchorEl(event.currentTarget);
    setFocusedFlyer(mapFlyers.find(({ id }) => id === flyerId));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFocusedFlyer(null);
  };

  return (
    <div>
      {/* // Important! Always set the container height explicitly */}
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          center={{
            lat: mapCoords.latitude,
            lng: mapCoords.longitude,
          }}
          onChange={({ bounds: { nw, se } }) => fetchMapFlyers({
            top: nw.lat,
            bottom: se.lat,
            left: nw.lng,
            right: se.lng,
          })}
          defaultZoom={zoom}
          zoomControl={false}
          zoomControlOptions={{
            // eslint-disable-next-line
            position: 4,
          }}
        >
          {mapFlyers.map(({ latitude, longitude, id: flyerId }) => (
            <RoomIcon
              className="markerButton"
              color="secondary"
              lat={latitude}
              lng={longitude}
              onClick={handleClick(flyerId)}
            />
          ))}
        </GoogleMapReact>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {/* eslint-disable-next-line */}
          <Typography className={classes.typography}>
            🔍 Detalles:
            {' '}
            {focusedFlyer && focusedFlyer.description}
            {' '}
            <br />
            <Link>Ver más</Link>
          </Typography>
        </Popover>
      </MapWrapper>

      <UserActions />
    </div>
  );
};

SimpleMap.propTypes = {
  coords: shape({
    latitude: number,
    longitude: number,
  }),
  zoom: number,
  fetchMapFlyers: func,
  mapFlyers: array,
};

SimpleMap.defaultProps = {
  zoom: 15,
};

export default compose(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  }),
  withContext(({ fetchMapFlyers, map }) => ({ fetchMapFlyers, mapFlyers: map })),
)(SimpleMap);
