import alt from 'flux/alt';
import { UserNotLoggedIn } from 'errors';
import UserStore from 'stores/UserStore';

class ProfilesActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return fetch("http://localhost:5000/api/v1/profiles", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.profiles);

    });
  }

  fetchWithId(id) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/profiles/${id}`, {
        method: "get",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      });

    }).then((response) => {
      return response.json();

    }).then((profile) => {
      this.dispatch(profile);

    });
  }

  update(id, attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/profiles/${id}`, {
        method: "put",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: attrs.title,
          private: attrs.private
        })
      });

    }).then((response) => {
      return response.json();

    }).then((profile) => {
      this.dispatch(profile);

    });
  }
}

export default alt.createActions(ProfilesActions);
