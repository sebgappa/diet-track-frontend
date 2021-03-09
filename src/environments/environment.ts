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
};
