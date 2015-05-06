import React from 'react/addons';
import reactMixin from 'react-mixin';

import AuthenticationActions from '../actions/AuthenticationActions';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  logIn(e) {
    e.preventDefault();
    AuthenticationActions.logInUser(this.state.username, this.state.password)
  }

  render() {
    return (
      <div>
        <p>Log In</p>
        <form>
          <input type="text" valueLink={this.linkState('username')} placeholder="Username" />
          <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
          <button type="submit" onClick={this.logIn.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}

reactMixin(Login.prototype, React.addons.LinkedStateMixin);
