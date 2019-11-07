import React from 'react';
import { bool } from 'prop-types';

import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import MessageIcon from '@material-ui/icons/Message';

import { propTypes } from '../propTypes';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: 60,
  },
  title: {
    flexGrow: 1,
  },
}));

const title = {
  new: {
    lost: '',
    found: '',
  },
  view: {
    lost: 'Perdido',
    found: 'Encontrado',
  },
};

export default function MenuAppBar({
  mode, onActionClick, actionDisabled, flyerDetail, user,
}) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search);

  const viewMode = !!query.id;
  const ownFlyer = !!(flyerDetail && user && flyerDetail.createdBy === user.email) || mode === 'new';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => window.history.back()}
              color="inherit"
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <Typography
            variant="h6"
            className={classes.title}
          >
            {title[mode][query.type]}
          </Typography>
          {ownFlyer && viewMode && (
            <IconButton
              aria-label="messages"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => history.push(`/messages?flyerId=${flyerDetail.id}`)}
              color="inherit"
            >
              <MessageIcon />
            </IconButton>
          )}
          { (ownFlyer || !viewMode)
            && (
              <Button disabled={actionDisabled} onClick={onActionClick} color="inherit">
                Publicar
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuAppBar.propTypes = {
  ...propTypes,
  actionDisabled: bool,
};
