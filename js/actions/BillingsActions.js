import alt from 'flux/alt';
import Parse from 'lib/Parse';

class BillingsActions {
  fetchAllForCurrentUser() {
    return Promise.resolve().then(() => {
      const query = new Parse.Query("Billing");
      return query.find();

    }).then((results) => {
      this.dispatch(results);

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
