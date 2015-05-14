import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import reactMixin from 'react-mixin';

import AuthenticatedComponent from 'decorators/AuthenticatedComponent';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

@connectToStores
class ProfileEdit extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.get("name"),
      email: this.props.user.get("email"),
      errorMessage: ''
    };
  }

  updateUser(e) {
    e.preventDefault();

    var { router } = this.context;

    let data = {
      name: this.state.name,
      email: this.state.email
    };

    UserActions.updateUser(this.props.user, data)
      .then(() => router.transitionTo('profile'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div>
        <form>
          <label>Name</label>
          <input type="text" valueLink={this.linkState('name')} placeholder="Name" />
          <label>Email</label>
          <input type="email" valueLink={this.linkState('email')} placeholder="Email" />
          <button type="submit" onClick={this.updateUser.bind(this)}>Submit</button>
        </form>
        {!!this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (null)}
        <Link to="profile">Cancel</Link>
      </div>
    );
  }
}

ProfileEdit.contextTypes = {
  router: React.PropTypes.func
};

reactMixin(ProfileEdit.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(ProfileEdit);
