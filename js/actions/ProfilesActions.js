import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';

class ProfilesActions {
  fetchAllForCurrentUser() {
    const currentUser = UserStore.getState().user();
    if (!currentUser) return Promise.CancellationError("No user logged in");

    return Promise.bind(this).then(function() {
      const query = new Parse.Query("Profile");
      query.equalTo("user", currentUser);
      return query.find();

    }).then(function(results) {
      this.dispatch(results);

    });
  }
}

export default alt.createActions(ProfilesActions);
