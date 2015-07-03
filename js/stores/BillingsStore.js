import alt from 'flux/alt';
import BillingsActions from 'actions/BillingsActions';

class BillingsStore {
  constructor() {
    this.bindListeners({
      setBillings: BillingsActions.FETCH_ALL_FOR_CURRENT_USER,
      setBilling: [
        BillingsActions.ADD_CARD_WITH_TOKEN_FOR_ID,
        BillingsActions.SUBSCRIBE_TO_PLAN_WITH_ID_FOR_ID
      ]
    });

    this.billings = {}
  }


  // MARK: Store methods
  setBillings(billings) {
    for (let billing of billings) {
      this.setBilling(billing);
    }
  }

  setBilling(billing) {
    this.billings[billing.id] = billing;
  }

  destroyBilling(billing) {
    delete this.billings[billing.id];
  }


  // MARK: Private methods


  // MARK: Public methods
  static billingsWithType(type) {
    const { billings } = this.getState();
    const filteredBillings = {};

    for (let key in billings) {
      let billing = billings[key];
      if (this.typeForId(key) == type) filteredBillings[billing.id] = billing;
    }

    return filteredBillings;
  }

  static forId(id) {
    const { billings } = this.getState();
    return billings[id];
  }

  static forCurrentUser() {
    let billings = this.billingsWithType("user");
    let id = Object.keys(billings)[0];
    return billings[id];
  }

  static forOrganizationWithId(id) {
    const billings = this.billingsWithType("organization");
    for (let key in billings) {
      let billing = billings[key];
      if (billing.get("relation").get("billingId") == id) return billing;
    }
  }

  static hasCardForId(id) {
    const billing = this.forId(id);
    return !!billing.get("last4");
  }

  static typeForId(id) {
    const billing = this.forId(id);
    if (billing.get("user")) {
      return "user";
    } else if (billing.get("organization")) {
      return "organization";
    }

    throw new Error("Could not determine type");
  }
}

export default alt.createStore(BillingsStore, 'BillingsStore');
