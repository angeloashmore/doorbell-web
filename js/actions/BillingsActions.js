import alt from 'flux/alt';
import UserStore from 'stores/UserStore';
import { UserNotLoggedIn } from 'errors';

class BillingsActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();

    return Promise.resolve().then(() => {
      if (!jwt) throw new UserNotLoggedIn();

      return fetch("http://localhost:5000/api/v1/billings", {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });

    }).then((response) => {
      return response.json();

    }).then((json) => {
      this.dispatch(json.billings);

    });
  }

  update(id, attrs) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/billings/${id}`, {
        method: "put",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: attrs.email
        })
      });

    }).then((response) => {
      return response.json();

    }).then((billing) => {
      this.dispatch(billing);

    });
  }

  replaceCardWithTokenForId(id, token) {
    return Promise.resolve().then(() => {
      const { jwt } = UserStore.getState();
      return fetch(`http://localhost:5000/api/v1/billings/${id}/card`, {
        method: "put",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stripe_token: token
        })
      });

    }).then((response) => {
      return response.json();

    }).then((billing) => {
      this.dispatch(billing);

    });
  }

  subscribeToPlanWithIdForId(id, planId) {
    return Promise.resolve().then(() => {

    // }).then((billing) => {
    //   this.dispatch(billing);

    });
  }
}

export default alt.createActions(BillingsActions);
