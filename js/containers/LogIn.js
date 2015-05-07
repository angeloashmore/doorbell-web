import React from 'react/addons';
import reactMixin from 'react-mixin';

import AuthenticationActions from '../actions/AuthenticationActions';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  logIn(e) {
    e.preventDefault();

    var { router } = this.context;

    AuthenticationActions.logInUser(this.state.username, this.state.password)
      .then(() => router.transitionTo('dashboard'))
      .fail((error) => this.setState({ errorMessage: error.message }));

    console.log(this.state.errorMessage)
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
        {!!this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (null)}
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func
};

reactMixin(Login.prototype, React.addons.LinkedStateMixin);
