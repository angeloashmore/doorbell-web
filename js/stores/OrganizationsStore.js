import alt from 'flux/alt';
import OrganizationsActions from 'actions/OrganizationsActions';

class OrganizationsStore {
  constructor() {
    this.bindListeners({
      setObjects: OrganizationsActions.FETCH_ALL_FOR_CURRENT_USER
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


  // MARK: Public methods
  static withId(id) {
    const objects = this.getState().objects;
    return objects[id];
  }
}

export default alt.createStore(OrganizationsStore, 'OrganizationsStore');
