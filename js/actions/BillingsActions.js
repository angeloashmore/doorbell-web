import alt from 'flux/alt';
import Parse from 'lib/Parse';

class BillingsActions {
  fetchAllForCurrentUser() {
    const { jwt } = UserStore.getState();
    if (!jwt) throw new UserNotLoggedIn();

    return Promise.resolve().then(() => {
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

  addCardWithTokenForId(id, token) {
    return Promise.resolve().then(() => {
      const data = { id: id, token: token };
      return Parse.Cloud.run("Billing__addCard", data);

    }).then((billing) => {
      this.dispatch(billing);

    });
  }

  subscribeToPlanWithIdForId(id, planId) {
    return Promise.resolve().then(() => {
      const data = { id: id, planId: plan.id };
      return Parse.Cloud.run("Billing__subscribeToPlan", data);

    }).then((billing) => {
      this.dispatch(billing);

    });
  }
}

export default alt.createActions(BillingsActions);
