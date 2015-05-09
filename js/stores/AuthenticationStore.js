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

  addCardToken(user) {
    this.user = user;
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(AuthenticationStore, 'AuthenticationStore');
