import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    lost: 'Mascota perdida',
    found: 'Mascota encontrada',
  },
};

export default function MenuAppBar({ mode }) {
  const classes = useStyles();
  const location = useLocation();
  const query = qs.parse(location.search);

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
          <Typography variant="h6" className={classes.title}>
            {title[mode][query.type]}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuAppBar.propTypes = propTypes;
