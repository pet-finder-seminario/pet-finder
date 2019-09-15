import React from 'react';
import { shape, number } from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { MapWrapper } from './components/styled';

const SimpleMap = ({ center, zoom }) => (
  // Important! Always set the container height explicitly
  <MapWrapper>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
    </GoogleMapReact>
  </MapWrapper>
);

SimpleMap.propTypes = {
  center: shape({
    lat: number,
    lng: number,
  }),
  zoom: number,
};

SimpleMap.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

export default SimpleMap;
