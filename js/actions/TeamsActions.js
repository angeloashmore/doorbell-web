import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';
import UserStore from 'stores/UserStore';

class TeamsActions {
  fetchAllForCurrentUser() {
    return Promise.bind(this).then(function() {
      const query = new Parse.Query(Parse.Role);
      return query.find();

    }).then(function(roles) {
      const teams = roles.map(function(role) {
        return role.get("team");
      });

      return Parse.Object.fetchAll(teams);

    }).then(function(teams) {
      this.dispatch(teams);

    });
  }

  create(attrs) {
    return Promise.bind(this).then(function() {
      let data = {
        name: attrs.name,
        email: attrs.email
      };
      return Parse.Cloud.run("Team__create", data);

    }).then(function(team) {
      this.dispatch(team);

    });
  }
}

export default alt.createActions(TeamsActions);
