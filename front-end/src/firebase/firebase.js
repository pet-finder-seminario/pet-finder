import * as firebase from 'firebase';
import devConfig from './config';

!firebase.apps.length && firebase.initializeApp(devConfig); // eslint-disable-line

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const messaging = firebase.messaging();

messaging.usePublicVapidKey('BMM55VQn0z01CgG8o47ffbdsgj5ARLLlVFtMbFDY-F3xmVu233veWAFPj535F-H0B9J4i0VTq2SJcZ2DOhBNFEw');

export default {
  auth,
  googleProvider,
  messaging,
};
