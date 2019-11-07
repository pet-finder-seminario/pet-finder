import * as firebase from 'firebase';
import devConfig from './config';

!firebase.apps.length && firebase.initializeApp(devConfig); // eslint-disable-line

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const messaging = firebase.messaging();

export default {
  auth,
  googleProvider,
  messaging,
};
