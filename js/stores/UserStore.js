import alt from 'flux/alt';
import jwt_decode from 'jwt-decode';
import { UserActions } from 'actions';

class UserStore {
  constructor() {
    this.bindListeners({
      setAuthData: [
        UserActions.RESTORE,
        UserActions.SIGN_IN,
      ],
      clearAllStores: UserActions.SIGN_OUT
    });

    this.user = null;
  }

  // MARK: Store methods
  setAuthData(authData) {
    this.user = authData;
  }

  clearAllStores() {
    alt.recycle();
  }


  // MARK: Private methods


  // MARK: Public methods
  static isLoggedIn() {
    const { user } = this.getState();
    return !!user;
  }

  static isExpired() {
    if (!UserStore.isLoggedIn()) throw new Error('Client not authenticated');
    const { user } = this.getState();
    return user.expires >= Date.now();
  }
}

export default alt.createStore(UserStore, 'UserStore');
