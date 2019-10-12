import React from 'react';
import { shape, number } from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';
import { MapWrapper } from './components/styled';
import UserActions from '../common/UserActions';

const SimpleMap = ({ zoom, coords }) => {
  const mapCoords = coords || {
    latitude: -31.409690,
    longitude: -64.188881,
  };

  return (
    <div styles={{ overflow: 'hidden' }}>
      {/* // Important! Always set the container height explicitly */}
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          center={{
            lat: mapCoords.latitude,
            lng: mapCoords.longitude,
          }}
          defaultZoom={zoom}
          zoomControl={false}
          zoomControlOptions={{
          // eslint-disable-next-line
          position: 4,
          }}
        >
          {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
        </GoogleMapReact>
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
};

SimpleMap.defaultProps = {
  zoom: 15,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(SimpleMap);
