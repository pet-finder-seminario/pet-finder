import React from 'react';
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
