/* eslint-disable react/no-unused-state */

import React from 'react';
import PropTypes from 'prop-types';
import Firebase from '../../firebase/firebase';

const { Provider, Consumer } = React.createContext({});

class AuthProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      finishedAuthCheck: false,
    };
  }

  componentDidMount() {
    Firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await Firebase.auth.currentUser.getIdToken(true);
        localStorage.setItem('ACCESS_TOKEN', token);
        localStorage.setItem('EMAIL', Firebase.auth.currentUser.email);
      }

      this.setState({
        user,
        finishedAuthCheck: true,
      });
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { AuthProvider, Consumer as AuthConsumer };
