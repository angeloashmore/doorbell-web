import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'lib/Parse';

class BillingsActions {
  fetchAllForCurrentUser() {
    return Promise.bind(this).then(function() {
      const query = new Parse.Query("Billing");
      return query.find();

    }).then(function(results) {
      this.dispatch(results);

    });
  }

  addCardWithTokenForId(id, token) {
    return Promise.bind(this).then(function() {
      let data = { id: id, token: token };
      return Parse.Cloud.run("Billing__addCard", data);

    }).then(function(billing) {
      this.dispatch(billing);

    });
  }

  subscribeToPlanWithIdForId(id, planId) {
    return Promise.bind(this).then(function() {
      let data = { id: id, planId: plan.id };
      return Parse.Cloud.run("Billing__subscribeToPlan", data);

    }).then(function(billing) {
      this.dispatch(billing);

    });
  }
}

export default alt.createActions(BillingsActions);
