import alt from '../flux/alt';
import UserActions from '../actions/UserActions';

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
      unsetUser: UserActions.LOG_OUT_USER
    });

    this.state = {
      user: null
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  unsetUser() {
    this.setState({ user: null });
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
