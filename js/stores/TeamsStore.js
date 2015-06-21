import alt from 'flux/alt';
import TeamsActions from 'actions/TeamsActions';

class TeamsStore {
  constructor() {
    this.bindListeners({
      setObjects: TeamsActions.FETCH_ALL_FOR_CURRENT_USER,
      setObject: TeamsActions.CREATE
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

export default alt.createStore(TeamsStore, 'TeamsStore');
