import Promise from 'bluebird';

import alt from 'flux/alt';
import Parse from 'stores/Parse';

class BillingActions {
  fetchAllWithinACL() {
    return Promise.bind(this).then(function() {
      const query = new Parse.Query("Billing");
      return query.find();

    }).then(function(results) {
      this.dispatch(results);

    });
  }
}

export default alt.createActions(BillingActions);
