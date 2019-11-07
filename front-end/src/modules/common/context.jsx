import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import snakeCase from 'lodash/snakeCase';
import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

import StyledSnackbar from './Snackbar';
import { FLYER_TYPE } from '../flyer-item/constants';

const { Consumer, Provider } = React.createContext();

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export class AppProvider extends React.PureComponent {
    static propTypes = {
      children: PropTypes.node.isRequired,
    }

    // eslint-disable-next-line react/state-in-constructor
    state = {
      map: [],
      found: [],
      lost: [],
      snackbarMessage: '',
      flyerDetail: null,
      replies: [],
    }

    componentDidMount() {
      this.getSearchFlyers();
    }

    postSearchFlyer = async (values) => {
      await apiClient.post('/search_flyers', {
        ...mapKeys(values, (_, key) => snakeCase(key)),
      });

      this.fetchMapFlyers();
      this.getSearchFlyers();
      this.showSuccessSnackbar('¡Actualizado con éxito!');
    }

    uploadImage = async data => {
      const { data: { result } } = await apiClient.post('/upload_image', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return result.photo_url;
    }

    showSuccessSnackbar = (snackbarMessage) => {
      this.setState({ snackbarMessage });
    }

    getSearchFlyers = async () => {
      const { data: { result: { flyers }, success } } = await apiClient.get('/search_flyers');
      if (success) {
        this.setState({
          found: flyers.filter(e => e.flyer_type === FLYER_TYPE.found).map(e => mapKeys(e, (_, key) => camelCase(key))),
          lost: flyers.filter(e => e.flyer_type === FLYER_TYPE.lost).map(e => mapKeys(e, (_, key) => camelCase(key))),
        });
      }
    }

    getSearchFlyer = async id => {
      const { data: { result: { flyer }, success } } = await apiClient.get(`/search_flyers/${id}`);
      if (success) {
        this.setState({
          flyerDetail: mapKeys(flyer, (_, key) => camelCase(key)),
        });
      }
    }

    getRepliesForFlyer = async flyerId => {
      const { data: { result: { messages }, success } } = await apiClient.get(`/search_flyers/${flyerId}/replies`);
      if (success) {
        this.setState({
          replies: messages.map(e => mapKeys(e, (_, key) => camelCase(key))),
        });
      }
    }

    postReply = async (flyerId, values) => {
      await apiClient.post(`/search_flyers/${flyerId}/replies`, {
        ...mapKeys(values, (_, key) => snakeCase(key)),
      });

      this.showSuccessSnackbar('¡Se ha enviado una notificación al usuario!');
    }

    fetchMapFlyers = async (bounds = {}) => {
      const { data: { result: { flyers }, success } } = await apiClient.get('/map_flyers', { params: { ...bounds } });
      if (success) {
        this.setState({
          map: flyers.map(e => mapKeys(e, (_, key) => camelCase(key))),
        });
      }
    }

    render() {
      const { children } = this.props;
      const { snackbarMessage } = this.state;

      const contextValue = {
        ...this.state,
        postSearchFlyer: this.postSearchFlyer,
        getSearchFlyers: this.getSearchFlyers,
        fetchMapFlyers: this.fetchMapFlyers,
        uploadImage: this.uploadImage,
        getSearchFlyer: this.getSearchFlyer,
        postReply: this.postReply,
        getRepliesForFlyer: this.getRepliesForFlyer,
      };

      return (
        <Provider value={contextValue}>
          {children}
          <StyledSnackbar
            type="success"
            message={snackbarMessage}
            open={!!snackbarMessage}
            onClose={() => this.setState({ snackbarMessage: '' })}
          />
        </Provider>
      );
    }
}

export const withContext = mapContextToProps => Comp => props => (
  <Consumer>
    {value => <Comp {...mapContextToProps(value)} {...props} />}
  </Consumer>
);

export default {
  AppProvider,
  withContext,
};
