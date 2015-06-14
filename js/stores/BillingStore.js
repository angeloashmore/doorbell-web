import alt from 'flux/alt';
import BillingActions from 'actions/BillingActions';

class BillingStore {
  constructor() {
    this.bindListeners({
      replaceBillings: BillingActions.FETCH_ALL_WITHIN_ACL
    });

    this.state = {
      billings: []
    };
  }

  replaceBillings(billings) {
    this.setState({ billings: billings });
  }

  _billingsForType(type) {
    return this.getState().plans.filter(function(plan) {
      const relationship = plan.get("relationship");
      relationship.className == type;
    });
  }

  static forCurrentUser() {
    return this._billingsForType("user")[0];
  }

  static forOrganizationWithId(organizationId) {
    const billings = this._billingsForType("organization");
    return billings.filter(function(billing) {
      return billing.id == organizationId;
    })[0];
  }
}

export default alt.createStore(BillingStore, 'BillingStore');
