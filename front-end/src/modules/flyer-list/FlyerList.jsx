import React from 'react';
import { string } from 'prop-types';
import { FlyerListWrapper } from './components/styled';

const FlyerList = ({ type }) => (
  <FlyerListWrapper>
    <h1>{type === 'lost' ? 'Perdidos!' : 'Encontrados!'}</h1>
  </FlyerListWrapper>
);

FlyerList.propTypes = {
  type: string.isRequired,
};

export default FlyerList;
