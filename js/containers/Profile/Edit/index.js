import React from 'react/addons';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import reactMixin from 'react-mixin';

import authenticatedComponent from 'decorators/authenticatedComponent';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

@authenticatedComponent
@connectToStores
@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class ProfileEdit extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.user.get("firstName"),
      lastName: this.props.user.get("lastName"),
      email: this.props.user.get("email"),
      errorMessage: ''
    };
  }

  updateUser(e) {
    e.preventDefault();

    var { router } = this.context;

    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
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
          <input type="text" valueLink={this.linkState('firstName')} placeholder="First Name" />
          <input type="text" valueLink={this.linkState('lastName')} placeholder="Last Name" />
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
