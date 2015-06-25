import alt from 'flux/alt';
import UserActions from 'actions/UserActions';

class UserStore {
  constructor() {
    this.bindListeners({
      setUser: [
        UserActions.RESTORE_CURRENT_USER,
        UserActions.LOG_IN_USER,
        UserActions.SIGN_UP_USER,
        UserActions.UPDATE_USER
      ],

      clear: [
        UserActions.LOG_OUT_USER
      ]
    });

    this.state = {
      user: null
    };
  }

  // MARK: Store methods
  setUser(user) {
    this.setState({ user: user });
  }

  clear() {
    this.setState({ user: null });
  }


  // MARK: Private methods


  // MARK: Public methods
  static isLoggedIn() {
    return !!this.getState().user;
  }
}

export default alt.createStore(UserStore, 'UserStore');
