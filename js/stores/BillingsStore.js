import alt from 'flux/alt';
import BillingsActions from 'actions/BillingsActions';

class BillingsStore {
  constructor() {
    this.bindListeners({
      setObjects: BillingsActions.FETCH_ALL_FOR_CURRENT_USER,
      setObject: [
        BillingsActions.ADD_CARD_WITH_TOKEN_FOR_ID,
        BillingsActions.SUBSCRIBE_TO_PLAN_WITH_ID_FOR_ID
      ]
    });

    this.state = {
      objects: {}
    };
  }


  // MARK: Store methods
  setObjects(objects) {
    for (let object of objects) {
      this.setObject(object);
    }
  }

  setObject(object) {
    this.setState({ objects[object.id]: object });
    // this.setState({
    //   objects: {
    //     `${object.id}`: object
    //   }
    // });
  }


  // MARK: Private methods
  _objectsWithType(type) {
    const objects = this.getState().objects;
    const filteredObjects = {};

    for (let key in objects) {
      let object = objects[key];
      if (object.get("type") == type) filteredObjects[object.id] = object;
    }

    return filteredObjects;
  }


  // MARK: Public methods
  static forId(id) {
    const objects = this.getState().objects;
    return objects[id];
  }

  static forCurrentUser() {
    let objects = this._objectsWithType("user");
    let id = Object.keys(objects)[0];
    return objects[id];
  }

  static forOrganizationWithId(id) {
    const objects = this._objectsWithType("organization");
    for (let key in objects) {
      let object = objects[key];
      if (object.get("relation").get("objectId") == id) return object;
    }
  }

  static hasCardForId(id) {
    const object = BillingStore.forId(id);
    return !!object.get("last4");
  }
}

export default alt.createStore(BillingsStore, 'BillingsStore');
