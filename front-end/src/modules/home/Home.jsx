import React, { useEffect } from 'react';
import { object } from 'prop-types';

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


const tabsIndex = ['map', 'lost', 'found', 'profile'];

const tabs = (props) => ({
  map: <MapScreen {...props} />,
  lost: <FlyerList type="lost" />,
  found: <FlyerList type="found" />,
  profile: <Profile />,
});

function Home({ match: { params }, history }) {
  const content = tabs()[params.tab];
  const selectedTabIndex = tabsIndex.indexOf(params.tab);

  useEffect(() => {
    // Notification.requestPermission().then((permission) => {
    //   if (permission === 'granted') {
    //     console.log('Notification permission granted.');
    //     // TODO(developer): Retrieve an Instance ID token for use with FCM.
    //     // ...
    //   } else {
    //     console.log('Unable to get permission to notify.');
    //   }
    // });

    // Firebase.messaging.getToken().then((currentToken) => {
    //   if (currentToken) {
    //     console.log(currentToken);
    //   } else {
    //     // Show permission request.
    //     console.log('No Instance ID token available. Request permission to generate one.');
    //     // Show permission UI.
    //   }
    // }).catch((err) => {
    //   console.log('An error occurred while retrieving token. ', err);
    // });
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
  history: object,
};

export default makePrivate(Home);
