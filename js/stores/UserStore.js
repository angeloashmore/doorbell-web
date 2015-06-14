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
        UserActions.ADD_CARD_TOKEN,
        UserActions.SUBSCRIBE_TO
      ],
      unsetAll: UserActions.LOG_OUT_USER
    });

    this.state = {
      user: null,
      profiles: []
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  unsetAll() {
    this.setState({
      user: null,
      profiles: []
    });
  }

  // MARK: Public interface
  static isLoggedIn() {
    return !!this.getState().user;
  }

  static hasCard() {
    if (this.getState().billing != null) {
      return !!this.getState().billing.get("last4");
    } else {
      return false;
    }
  }
}

export default alt.createStore(UserStore, 'UserStore');
