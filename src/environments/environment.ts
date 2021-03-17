import { domain, clientId, audience, apiUri } from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    audience,
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
  firebase: {
    apiKey: "AIzaSyA3Z49ooRwRR5bSagqbslj2pCEwmivNRsk",
    authDomain: "diettrack-4850c.firebaseapp.com",
    projectId: "diettrack-4850c",
    storageBucket: "diettrack-4850c.appspot.com",
    messagingSenderId: "756064667679",
    appId: "1:756064667679:web:953118798dbe6f2c682d2a",
    measurementId: "G-VH263DL0HY"
  }
};
