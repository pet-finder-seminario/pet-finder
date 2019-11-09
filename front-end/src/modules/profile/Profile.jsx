import React from 'react';
import { object } from 'prop-types';
import compose from 'lodash/fp/compose';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import PersonIcon from '@material-ui/icons/Person';

import { ProfileWrapper } from './components/styled';
import { withAuthContext } from '../auth/authContext';

const useStyles = makeStyles(() => ({
  avatar: {
    marginTop: 36,
    height: 150,
    width: 150,
    backgroundColor: deepOrange[400],
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon: {
    height: 100,
    width: 100,
  },
  username: {
    textAlign: 'center',
    marginTop: 24,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();

  return (
    <ProfileWrapper className={classes.wrapper}>
      <Avatar className={classes.avatar}>
        <PersonIcon className={classes.icon} />
      </Avatar>
      <Typography className={classes.username} variant="h6">{user.email}</Typography>
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  user: object,
};

export default compose(
  withAuthContext(({ user }) => ({ user })),
)(Profile);
