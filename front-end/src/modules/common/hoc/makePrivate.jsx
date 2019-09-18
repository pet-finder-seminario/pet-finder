import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import routes from '../../../routes';
import { AuthConsumer } from '../../auth/authContext';

class PrivateScreen extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <AuthConsumer>
        {({ user, finishedAuthCheck }) => {
          if (!finishedAuthCheck) {
            return <Loading />;
          }

          return user ? children : <Redirect to={routes.login} />;
        }}
      </AuthConsumer>
    );
  }
}

/* HOC to make Private Screens using Context Consumer */
function makePrivate(Comp) {
  return props => <PrivateScreen>{<Comp {...props} />}</PrivateScreen>;
}

export default makePrivate;
