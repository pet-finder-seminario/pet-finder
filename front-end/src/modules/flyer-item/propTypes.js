import PropTypes from 'prop-types';

export const propTypes = {
  mode: PropTypes.string,
  user: PropTypes.object,
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
