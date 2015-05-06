import alt from '../flux/alt';
import AuthenticationActions from '../actions/AuthenticationActions';

class AuthenticationStore {
  constructor() {
    this.bindActions(AuthenticationActions);

    this.user = null;
  }

  restoreCurrentUser(user) {
    this.logInUser(user);
  }

  logInUser(user) {
    this.user = user;
  }

  logOutUser() {
    this.user = null;
  }

  signUpUser(user) {
    this.logInUser(user);
  }

  static isLoggedIn() {
    return !!this.user;
  }
}

export default alt.createStore(AuthenticationStore, 'AuthenticationStore');
