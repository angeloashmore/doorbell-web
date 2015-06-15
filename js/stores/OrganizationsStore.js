import alt from 'flux/alt';
import OrganizationsActions from 'actions/OrganizationsActions';

class OrganizationsStore {
  constructor() {
    this.bindListeners({
      replaceObjects: OrganizationsActions.FETCH_ALL_FOR_CURRENT_USER
    });

    this.state = {
      objects: []
    };
  }


  // MARK: Store methods
  replaceObjects(objects) {
    this.setState({ objects: objects });
  }


  // MARK: Private methods


  // MARK: Public methods
  static withId(id) {
    const objects = this.getState().objects;
    return objects.find(function(object, index, array) {
      return object.id == id;
    });
  }
}

export default alt.createStore(OrganizationsStore, 'OrganizationsStore');
