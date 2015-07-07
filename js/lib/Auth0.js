import Auth0 from 'auth0-js'
import config from 'config';

const auth0 = new Auth0({
  domain: config.Auth0.DOMAIN,
  clientID: config.Auth0.CLIENT_ID
});

auth0.signInPromise = function(options) {
  return new Promise(function(resolve, reject) {
    auth0.login(options, function(error, _user, jwt) {
      if (error) {
        reject(error)
      } else {
        resolve(jwt)
      }
    });
  });
}

auth0.signUpPromise = function(options) {
  return new Promise(function(resolve, reject) {
    auth0.signup(options, function(error, _user, jwt) {
      if (error) {
        reject(error)
      } else {
        resolve(jwt)
      }
    });
  });
}

auth0.changePasswordPromise = function(options) {
  return new Promise(function(resolve, reject) {
    auth0.changePassword(options, function(error, response) {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    });
  });
}

export default auth0;
