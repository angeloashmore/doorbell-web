import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';
import UserStore from 'stores/UserStore';

class OrganizationsActions {
  fetchAllForCurrentUser() {
    const currentUser = UserStore.getState().user();
    if (!currentUser) return Promise.CancellationError("No user logged in");

    return Promise.bind(this).then(function() {
      const query = new Parse.Query(Parse.Role);
      query.equalTo("users", currentUser);
      return query.find();

    }).then(function(roles) {
      return roles.map(function(role) {
        return role.get("organization");
      });

    }).then(function(organizations) {
      this.dispatch(organizations);

    });
  }
}

export default alt.createActions(OrganizationsActions);
