import React from 'react';
import { string, array } from 'prop-types';
import { useHistory } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { withContext } from '../common/context';
import { FlyerListWrapper } from './components/styled';
import CardItem from './components/CardItem';

const FlyerList = ({ type, lost, found }) => {
  const title = type === 'lost' ? '🔍 Mascotas perdidas' : '🐈 Mascotas encontradas';
  const subtitle = type === 'lost' ? 'Ayudá a sus dueños a encontrarla compartiendo la publicación' : 'Ayudalos a encontrarse con sus dueños compartiendo la publicación';
  const content = type === 'lost' ? lost : found;
  const history = useHistory();

  return (
    <FlyerListWrapper>
      <div className="container">
        <h2 className="title">{title}</h2>
        <h4 className="subtitle">{subtitle}</h4>
        {content.map(pet => <CardItem pet={pet} />)}
      </div>
      <Fab onClick={() => history.push(`/new-flyer?type=${type}`)} color="primary" aria-label="add" className="fab">
        <AddIcon />
      </Fab>
    </FlyerListWrapper>
  );
};

FlyerList.propTypes = {
  type: string.isRequired,
  lost: array,
  found: array,
};

export default withContext(({ lost, found }) => ({ lost, found }))(FlyerList);
