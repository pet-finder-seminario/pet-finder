import React from 'react';
import {
  shape, number, func, array,
} from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { useHistory } from 'react-router-dom';
import { geolocated } from 'react-geolocated';
import compose from 'lodash/fp/compose';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';

import { MapWrapper } from './components/styled';
import UserActions from '../common/UserActions';
import { withContext } from '../common/context';
import { FLYER_TYPE } from '../flyer-item/constants';

const useStyles = makeStyles(() => ({
  typography: {
  },
  petPhoto: {
    height: 100,
    width: 100,
  },
  popover: {
    padding: 0,
  },
  popoverName: {
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',
    marginTop: 8,
  },
  centerCroppedWrapper: {
    left: '50%',
    marginBottom: -3,
  },
  centerCropped: {
    width: 100,
    height: 100,
    textAlign: 'center',
    overflow: 'hidden',
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
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [focusedFlyer, setFocusedFlyer] = React.useState(null);
  const typeText = focusedFlyer && focusedFlyer.flyerType === FLYER_TYPE.lost ? 'lost' : 'found';

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
          classes={{
            paper: classes.popover,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {/* <span className={classes.popoverName}>{focusedFlyer && focusedFlyer.petName}</span> */}
          <div
            onClick={() => history.push(`/flyer?type=${typeText}&id=${focusedFlyer && focusedFlyer.id}`)}
            className={classes.centerCroppedWrapper}
          >
            <img
              alt="pet"
              className={classes.centerCropped}
              src={focusedFlyer && focusedFlyer.photoUrl}
            />
          </div>
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
