import 'whatwg-fetch';
import alt from 'flux/alt';
import Parse from 'lib/Parse';
import UserStore from 'stores/UserStore';

class TeamsActions {
  fetchAllForCurrentUser() {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch("http://localhost:5000/api/v1/teams", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.teams);

    });
  }

  create(attrs) {
    return Promise.resolve().then(() => {
      let data = {
        name: attrs.name,
        email: attrs.email
      };
      return Parse.Cloud.run("Team__create", data);

    }).then((team) => {
      this.dispatch(team);

    });
  }

  update(id, attrs) {
    return Promise.resolve().then(() => {
      const query = new Parse.Query("Team");
      return query.get(id);

    }).then((team) => {
      team.set(attrs);
      return team.save();

    }).then((team) => {
      this.dispatch(team);

    });
  }

  destroy(id) {
    return Promise.resolve().then(() => {
      return Parse.Cloud.run("Team__destory", { id: id });

    }).then((team) => {
      this.dispatch(team);

    });
  }
}

export default alt.createActions(TeamsActions);
