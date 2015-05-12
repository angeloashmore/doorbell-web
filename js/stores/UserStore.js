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
      ],
      setBilling: [
        UserActions.FETCH_BILLING,
        UserActions.ADD_CARD_TOKEN
      ],
      unsetAll: UserActions.LOG_OUT_USER
    });

    this.state = {
      user: null,
      billing: null
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  setBilling(billing) {
    this.setState({ billing: billing });
  }

  unsetAll() {
    this.setState({
      user: null,
      billing: null
    });
  }

  static isLoggedIn() {
    return !!this.getState().user;
  }

  static hasStripeCustomer() {
    if (this.isLoggedIn()) {
      return !!this.getState().billing;
    } else {
      return false;
    }
  }

  static hasCard() {
    if (this.isLoggedIn() && this.hasStripeCustomer()) {
      return !!this.getState().billing.get("last4");
    } else {
      return false;
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
