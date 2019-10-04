import React from 'react';
import TopBar from './components/TopBar';

const FlyerItem = (props) => (
  <>
    <TopBar {...props} />
    <h1>Aviso de búsqueda</h1>
  </>
);

export default FlyerItem;
