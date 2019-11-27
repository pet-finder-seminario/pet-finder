import React, { useEffect } from 'react';
import { object, func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import compose from 'lodash/fp/compose';

/* Material UI */
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PetsIcon from '@material-ui/icons/Pets';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

/* Screens */
import MapScreen from '../map-screen';
import FlyerList from '../flyer-list';
import Profile from '../profile';

import TopBar from './components/TopBar';
import { HomeWrapper } from './components/styled';
import makePrivate from '../common/hoc/makePrivate';
import Firebase from '../../firebase/firebase';
import { withContext } from '../common/context';
import { withAuthContext } from '../auth/authContext';
import { useDialog } from '../common/DialogContext';

const tabsIndex = ['map', 'lost', 'found', 'profile'];

const tabs = (props) => ({
  map: <MapScreen {...props} />,
  lost: <FlyerList type="lost" />,
  found: <FlyerList type="found" />,
  profile: <Profile />,
});

function Home({
  match: { params }, user, postUserData,
}) {
  const content = tabs()[params.tab];
  const selectedTabIndex = tabsIndex.indexOf(params.tab);
  const showDialog = useDialog();
  const history = useHistory();

  useEffect(() => {
    if (Firebase.messaging) {
      Firebase.messaging
        .requestPermission()
        .then(async () => {
          const firebaseToken = await Firebase.messaging.getToken();

          postUserData({
            email: user.email,
            pushToken: firebaseToken,
          });
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });

      navigator.serviceWorker.addEventListener(
        'message', ({ data }) => {
          console.log(data);
          const payload = data['firebase-messaging-msg-data'].data;
          showDialog({
            title: '¡Respondieron tu aviso!',
            message: payload.body,
            actionText: 'Ver respuestas',
            onAction: () => {
              history.push(`/messages?flyerId=${payload.flyer_id}`);
            },
          });
        },
      );
    }
  }, []);

  return (
    <HomeWrapper>
      <TopBar />
      {content}
      <BottomNavigation
        value={selectedTabIndex}
        onChange={(_, newValue) => {
          history.push(`/home/${tabsIndex[newValue]}`);
        }}
        showLabels
      >
        <BottomNavigationAction label="Mapa" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Perdidos" icon={<SearchIcon />} />
        <BottomNavigationAction label="Encontrados" icon={<PetsIcon />} />
        <BottomNavigationAction label="Perfil" icon={<PersonIcon />} />
      </BottomNavigation>
    </HomeWrapper>
  );
}

Home.propTypes = {
  match: object,
  postUserData: func,
  user: object,
};

export default compose(
  withAuthContext(({ user }) => ({ user })),
  withContext(({ postUserData }) => ({ postUserData })),
  makePrivate,
)(Home);
