import React from 'react';
import { string, array } from 'prop-types';
import { withContext } from '../common/context';
import { FlyerListWrapper } from './components/styled';
import CardItem from './components/CardItem';

const FlyerList = ({ type, lost, found }) => {
  const content = type === 'lost' ? lost : found;
  return (
    <FlyerListWrapper>
      <h2>{type === 'lost' ? 'Perdidos!' : 'Encontrados!'}</h2>
      {content.map(
        ({
          petName,
          description,
          photoUrl,
        }) => <CardItem title={petName} description={description} photoUrl={photoUrl} />,
      )}
    </FlyerListWrapper>
  );
};

FlyerList.propTypes = {
  type: string.isRequired,
  lost: array,
  found: array,
};

export default withContext(({ lost, found }) => ({ lost, found }))(FlyerList);
