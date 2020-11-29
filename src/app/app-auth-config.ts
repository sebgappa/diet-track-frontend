import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '424988689226-odi591ghqa5t10sgs1b6kvhs9d002eb7.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    clearHashAfterLogin: true,
};
