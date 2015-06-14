import alt from 'flux/alt';
import OrganizationsActions from 'actions/OrganizationsActions';

class OrganizationsStore {
  constructor() {
    this.bindListeners({
      replaceOrganizations OrganizationsActions.FETCH_ALL_FOR_CURRENT_USER
    });

    this.state = {
      organizations: []
    };
  }

  replaceOrganizations(organizations) {
    this.setState({ organizations: organizations });
  }

  // MARK: Public interface
  static getWithId(id) {
    const organizations = this.getState().organizations;
    return organizations.find(function(organization, index, array) {
      return organization.id == id;
    });
  }
}

export default alt.createStore(OrganizationsStore, 'OrganizationsStore');
