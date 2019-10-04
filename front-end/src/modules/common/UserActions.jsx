import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import PetsIcon from '@material-ui/icons/Pets';
import SearchIcon from '@material-ui/icons/Search';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

const actions = [
  { icon: <SearchIcon />, name: 'Perdí mi mascota', route: '/new-flyer?type=lost' },
  { icon: <PetsIcon />, name: 'Encontré una mascota', route: '/new-flyer?type=found' },
];

const StyledSpeedDialAction = styled(SpeedDialAction)
  .attrs({
    classes: {
      staticTooltipLabel: 'userActionsCustomLabel',
    },
  })``;

const UserActions = () => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = screen => () => {
    history.push(screen);
    handleClose();
  };

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        style={{ position: 'absolute', bottom: 70, left: 10 }}
        ariaLabel="User actions"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <StyledSpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            tooltipPlacement="right"
            onClick={handleClick(action.route)}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserActions;
