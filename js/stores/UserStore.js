import alt from '../flux/alt';
import UserActions from '../actions/UserActions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);

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

  updateUser(user) {
    this.user = user;
  }

  addCardToken(user) {
    this.user = user;
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }

  static hasCard() {
    if (this.isLoggedIn()) {
      return !!this.getState().user.get("billingBrand") && !!this.getState().user.get("billingLast4");
    } else {
      return false;
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
