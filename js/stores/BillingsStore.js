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
  _billingsWithType(type) {
    const filteredBillings = {};

    for (let key in this.billings) {
      let billing = billings[key];
      if (billing.get("type") == type) filteredBillings[billing.id] = billing;
    }

    return filteredBillings;
  }


  // MARK: Public methods
  static forId(id) {
    const { billings } = this.getState();
    return billings[id];
  }

  static forCurrentUser() {
    let billings = this._billingsWithType("user");
    let id = Billing.keys(billings)[0];
    return billings[id];
  }

  static forOrganizationWithId(id) {
    const billings = this._billingsWithType("organization");
    for (let key in billings) {
      let billing = billings[key];
      if (billing.get("relation").get("billingId") == id) return billing;
    }
  }

  static hasCardForId(id) {
    const billing = BillingStore.forId(id);
    return !!billing.get("last4");
  }
}

export default alt.createStore(BillingsStore, 'BillingsStore');
