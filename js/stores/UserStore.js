import alt from 'flux/alt';
import UserActions from 'actions/UserActions';

class UserStore {
  constructor() {
    this.bindListeners({
      setUser: [
        UserActions.RESTORE_CURRENT_USER,
        UserActions.LOG_IN_USER,
        UserActions.SIGN_UP_USER,
        UserActions.UPDATE_USER,
        UserActions.ADD_CARD_TOKEN
      ],
      unsetAll: UserActions.LOG_OUT_USER
    });

    this.state = {
      user: null
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  unsetAll() {
    this.setState({ user: null });
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }

  static hasStripeCustomer() {
    if (this.isLoggedIn()) {
      return !!this.getState().user.get("billing");
    } else {
      return false;
    }
  }

  static hasCard() {
    if (this.isLoggedIn() && this.hasStripeCustomer()) {
      return !!this.getState().user.get("billing").get("last4");
    } else {
      return false;
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
