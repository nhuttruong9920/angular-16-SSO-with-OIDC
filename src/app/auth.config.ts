import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  requireHttps: false,
  issuer: 'https://localhost:5001',
  redirectUri: 'http://localhost:4200/signin-oidc',
  clientId: 'avema_client',
  responseType: 'code',
  scope: 'openid profile avema_api.full',
  postLogoutRedirectUri: 'http://localhost:4200/signout-callback-oidc',

  // issuer: 'https://idsvr4.azurewebsites.net',
  // redirectUri: 'http://localhost:4200/home',
  // postLogoutRedirectUri: 'http://localhost:4200/login',
  // clientId: 'spa',
  // responseType: 'code',
  // scope: 'openid profile email offline_access api',
};
