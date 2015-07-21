import alt from 'flux/alt';
import Actions from 'actions';

class RolesStore {
  constructor() {
    this.bindListeners({
      setRoles: Actions.Roles.FETCH_ALL_FOR_CURRENT_USER
    });

    this.roles = new Map();
  }


  // MARK: Store methods
  setRoles(roles) {
    for (let role of roles) {
      this.setRole(role);
    }
  }

  setRole(role) {
    this.roles.set(role.id, role);
  }

  deleteRole(role) {
    this.roles.delete(role.id);
  }

  // MARK: Private methods


  // MARK: Public methods
  static withFilter(block, roles = this.getState().roles) {
    return new Map([...roles].filter((entry) => block(entry[1])));
  }

  static withId(id) {
    return this.getState().roles.get(id);
  }

  static forUserWithId(id) {
    return this.withFilter(role => role.user_id == id);
  }

  static forTeamWithId(id) {
    return this.withFilter(role => role.team_id == id);
  }

  static forUserWithIdforTeamWithId(user_id, team_id) {
    const roles = this.withFilter(role => {
      return role.user_id == user_id &&
             role.team_id == team_id
    });
    return roles.values().next().value;
  }
}

export default alt.createStore(RolesStore, 'RolesStore');
