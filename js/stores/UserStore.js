import alt from 'flux/alt';
import UserActions from 'actions/UserActions';

class UserStore {
  constructor() {
    this.bindListeners({
      setUser: [
        UserActions.RESTORE_CURRENT,
        UserActions.SIGN_IN,
        UserActions.SIGN_UP,
        UserActions.UPDATE
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
