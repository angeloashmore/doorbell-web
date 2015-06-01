import React from 'react/addons';
import reactMixin from 'react-mixin';

import UserActions from 'actions/UserActions';

@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class SignUp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      errorMessage: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    var { router } = this.context;

    let data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    UserActions.signUpUser(data)
      .then(() => router.transitionTo('dashboard'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div>
        <p>Sign Up</p>
        <form>
          <input type="text" valueLink={this.linkState('username')} placeholder="Username" />
          <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
          <input type="email" valueLink={this.linkState('email')} placeholder="Email" />
          <input type="text" valueLink={this.linkState('firstName')} placeholder="First Name" />
          <input type="text" valueLink={this.linkState('lastName')} placeholder="Last Name" />
          <button type="submit" onClick={this.signUp.bind(this)}>Submit</button>
        </form>
        {!!this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (null)}
      </div>
    );
  }
}
