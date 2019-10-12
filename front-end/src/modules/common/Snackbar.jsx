import React from 'react';
import {
  boolean, string, func, oneOf,
} from 'prop-types';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const StyledSnackbar = ({
  open, message, onClose, type,
}) => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <SnackbarContent
        className={classes[type]}
        aria-describedby="client-snackbar"
        message={(
          <span
            id="client-snackbar"
            className={classes.message}
          >
            <CheckCircleIcon className={classes.icon} />
            {message}
          </span>
                )}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

StyledSnackbar.propTypes = {
  open: boolean,
  message: string,
  onClose: func,
  type: oneOf(['success', 'error']),
};

StyledSnackbar.defaultProps = {
  message: '',
  type: 'success',
};

export default StyledSnackbar;
