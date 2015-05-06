import React from 'react/addons';
import reactMixin from 'react-mixin';

import AuthenticationActions from '../actions/AuthenticationActions';

export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  signUp(e) {
    e.preventDefault();
    AuthenticationActions.signUpUser(this.state.username, this.state.password, { email: this.state.email });
  }

  render() {
    return (
      <div>
        <p>Sign Up</p>
        <form>
          <input type="text" valueLink={this.linkState('username')} placeholder="Username" />
          <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
          <input type="text" valueLink={this.linkState('email')} placeholder="Email" />
          <button type="submit" onClick={this.signUp.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}

reactMixin(SignUp.prototype, React.addons.LinkedStateMixin);
