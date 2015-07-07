import Auth0 from 'auth0-js'
import config from 'config';

const auth0 = new Auth0({
  domain: config.Auth0.DOMAIN,
  clientID: config.Auth0.CLIENT_ID
});

export default auth0;
