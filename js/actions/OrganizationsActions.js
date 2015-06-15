import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';
import UserStore from 'stores/UserStore';

class OrganizationsActions {
  fetchAllForCurrentUser() {
    return Promise.bind(this).then(function() {
      const query = new Parse.Query(Parse.Role);
      return query.find();

    }).then(function(roles) {
      const organizations = roles.map(function(role) {
        return role.get("organization");
      });

      return Parse.Object.fetchAll(organizations);

    }).then(function(organizations) {
      this.dispatch(organizations);

    });
  }
}

export default alt.createActions(OrganizationsActions);
