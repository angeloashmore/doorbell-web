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
      ]
    });

    this.user = null
  }

  // MARK: Store methods
  setUser(user) {
    this.user = user;
  }


  // MARK: Private methods


  // MARK: Public methods
  static isLoggedIn() {
    const { user } = this.getState();
    return !!user;
  }
}

export default alt.createStore(UserStore, 'UserStore');
