import alt from 'flux/alt';
import BillingsActions from 'actions/BillingsActions';

class BillingsStore {
  constructor() {
    this.bindListeners({
      setBillings: BillingsActions.FETCH_ALL_FOR_CURRENT_USER,
      setBilling: [
        BillingsActions.REPLACE_CARD_WITH_TOKEN_FOR_ID,
        BillingsActions.SUBSCRIBE_TO_PLAN_WITH_ID_FOR_ID
      ]
    });

    this.billings = new Map();
  }


  // MARK: Store methods
  setBillings(billings) {
    for (let billing of billings) {
      this.setBilling(billing);
    }
  }

  setBilling(billing) {
    this.billings.set(billing.id, billing);
  }

  deleteBilling(billing) {
    this.billings.delete(billing.id);
  }


  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, billings = this.getState().billings) {
    return new Map([...billings].filter((entry) => block(entry[1])));
  }

  static forId(id) {
    return this.getState().billings.get(id);
  }

  static forType(type) {
    return this.withFilter(billing => billing.relation_type == type);
  }

  static forCurrentUser() {
    return this.forType("user").values().next().value;
  }

  static forTeamWithId(id) {
    const billings = this.withFilter(billing => {
      return billing.relation_type == "team" &&
             billing.relation_id == id
    });
    return billings.values().next().value;
  }

  static hasCardForId(id) {
    return !!this.forId(id).last4;
  }
}

export default alt.createStore(BillingsStore, 'BillingsStore');
