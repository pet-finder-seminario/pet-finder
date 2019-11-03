import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  shape, number, func, bool,
} from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const MapWrapper = styled.div`
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: 100vh;

  .markerButton {
    transform: scale(3);
  }
`;

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const PickLocation = ({
  zoom,
  coords,
  open,
  handleClose,
  onLocationPicked,
}) => {
  const mapCoords = coords || {
    latitude: -31.409690,
    longitude: -64.188881,
  };
  const classes = useStyles();
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    const viewedLocationHelpDialog = localStorage.getItem('VIEWED_LOCATION_HELP');
    if (!viewedLocationHelpDialog) {
      setHelpModalOpen(true);
      localStorage.setItem('VIEWED_LOCATION_HELP', true);
    }
  }, []);

  const [pointCoords, setPointCoords] = useState();

  const positionIcon = pointCoords && (
    <RoomIcon
      className="markerButton"
      color="secondary"
      lat={pointCoords.lat}
      lng={pointCoords.lng}
    />
  );

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ubicación
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              onLocationPicked(pointCoords);
              handleClose();
            }}
          >
            Confirmar
          </Button>
        </Toolbar>
      </AppBar>
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          center={{
            lat: mapCoords.latitude,
            lng: mapCoords.longitude,
          }}
          defaultZoom={zoom}
          zoomControl={false}
          onClick={({ lat, lng }) => setPointCoords({ lat, lng })}
          zoomControlOptions={{
            // eslint-disable-next-line
                position: 4,
          }}
        >
          {positionIcon}
        </GoogleMapReact>
      </MapWrapper>
      <Dialog
        open={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Seleccioná una ubicación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Elegí una ubicación en el mapa y luego presioná "Confirmar"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!!pointCoords}
            color="primary"
            autoFocus
            onClick={() => setHelpModalOpen(false)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

PickLocation.propTypes = {
  coords: shape({
    latitude: number,
    longitude: number,
  }),
  zoom: number,
  open: bool,
  handleClose: func,
  onLocationPicked: func,
};

PickLocation.defaultProps = {
  zoom: 15,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(PickLocation);
