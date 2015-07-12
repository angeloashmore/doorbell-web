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
      if (billing.type == type) filteredBillings[billing.id] = billing;
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

  static forTeamWithId(id) {
    const billings = this.billingsWithType("team");
    for (let key in billings) {
      let billing = billings[key];
      if (billing.relation_id == id) return billing;
    }
  }

  static hasCardForId(id) {
    const billing = this.forId(id);
    return !!billing.get("last4");
  }
}

export default alt.createStore(BillingsStore, 'BillingsStore');
