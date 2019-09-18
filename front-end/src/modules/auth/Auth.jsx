import React from 'react';
import { Redirect } from 'react-router-dom';

import Firebase from '../../firebase/firebase';
import Loading from '../common/Loading';
import { AuthConsumer } from './authContext';
import routes from '../../routes';

class Authenticator extends React.PureComponent {
  componentDidMount() {
    Firebase.auth.signInWithRedirect(Firebase.googleProvider);
  }

  render() {
    return <Loading />;
  }
}

const Auth = () => (
  <AuthConsumer>
    {({ user, finishedAuthCheck }) => {
      if (!finishedAuthCheck) {
        return <Loading />;
      }
      return !user ? <Authenticator /> : <Redirect to={routes.map} />;
    }}
  </AuthConsumer>
);

export default Auth;
