import alt from 'flux/alt';
import Parse from 'lib/Parse';
import { UserNotLoggedIn } from 'errors';
import UserStore from 'stores/UserStore';

class ProfilesActions {
  fetchAllForCurrentUser() {
    const currentUser = UserStore.getState().user;
    if (!currentUser) throw new UserNotLoggedIn();

    return Promise.resolve().then(() => {
      const query = new Parse.Query("Profile");
      query.equalTo("user", currentUser);
      return query.find();

    }).then((results) => {
      this.dispatch(results);

    });
  }
}

export default alt.createActions(ProfilesActions);
