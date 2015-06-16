import alt from 'flux/alt';
import UserActions from 'actions/UserActions';

class UserStore {
  constructor() {
    this.bindListeners({
      setObject: [
        UserActions.RESTORE_CURRENT_USER,
        UserActions.LOG_IN_USER,
        UserActions.SIGN_UP_USER,
        UserActions.UPDATE_USER
      ]
    });

    this.state = {
      object: null
    };
  }

  // MARK: Store methods
  setObject(object) {
    this.setState({ object: object });
  }


  // MARK: Private methods


  // MARK: Public methods
  static isLoggedIn() {
    return !!this.getState().object;
  }
}

export default alt.createStore(UserStore, 'UserStore');
