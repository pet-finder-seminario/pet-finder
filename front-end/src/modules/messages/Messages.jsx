import React, { useEffect, useState } from 'react';
import { array, func } from 'prop-types';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import format from 'date-fns/format';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import CallIcon from '@material-ui/icons/Call';

import { withContext } from '../common/context';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  content: {
    padding: 16,
  },
  cardText: {
    wordWrap: 'break-word',
  },
  cardTextDate: {
    wordWrap: 'break-word',
    textAlign: 'right',
  },
  card: {
    marginBottom: 16,
  },
  contentTitle: {
    color: '#565656',
    textAlign: 'center',
  },
  contentSubtitle: {
    marginTop: 16,
    color: '#565656',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  avatar: {
    backgroundColor: deepOrange[400],
    marginRight: 18,
  },
  paper: {
    marginTop: '40%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 24,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Messages = ({ getRepliesForFlyer, replies }) => {
  const location = useLocation();
  const query = qs.parse(location.search);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [telephone, setTelephone] = useState('');

  useEffect(() => {
    getRepliesForFlyer(query.flyerId);
  }, []);

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => window.history.back()} aria-label="close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            Respuestas
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <h2 className={classes.contentTitle}>Mensajes</h2>
        <h4 className={classes.contentSubtitle}>Las respuestas a tu aviso</h4>
        {replies.map(({
          sender, content, phoneNumber = '4123312312', date,
        }) => (
          <div className={classes.message}>
            <Avatar className={classes.avatar}>{sender[0].toUpperCase()}</Avatar>
            <Card
              onClick={() => {
                setModalOpen(true);
                setTelephone(phoneNumber);
              }}
              className={classes.card}
            >
              <CardContent>
                <Typography className={classes.cardTextDate} color="textSecondary" gutterBottom>
                  {format(new Date(date), 'dd-MM-yyyy')}
                </Typography>
                <Typography className={classes.cardText} color="textSecondary" gutterBottom>
                  {content}
                  {' '}
Hacé click en la tarjeta para llamarlo
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    setModalOpen(true);
                    setTelephone(phoneNumber);
                  }}
                  size="small"
                >
Contactar

                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen && telephone}
        onClose={() => setModalOpen(false)}
      >
        <div className={classes.paper} onClick={() => window.open(`tel:${telephone}`)}>
          <Typography variant="h4" color="primary" style={{ textAlign: 'center' }} id="simple-modal-title">
            <CallIcon />
            {' '}
            {telephone}
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

Messages.propTypes = {
  replies: array,
  getRepliesForFlyer: func,
};

Messages.defaultProps = {
  replies: [],
};

export default withContext(
  ({ getRepliesForFlyer, replies }) => ({ getRepliesForFlyer, replies }),
)(Messages);
