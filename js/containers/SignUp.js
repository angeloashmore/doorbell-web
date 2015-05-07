import React from 'react/addons';
import reactMixin from 'react-mixin';

import AuthenticationActions from '../actions/AuthenticationActions';

export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      errorMessage: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    var { router } = this.context;

    AuthenticationActions.signUpUser(this.state.username, this.state.password, { email: this.state.email })
      .then(() => router.transitionTo('dashboard'))
      .fail((error) => this.setState({ errorMessage: error.message }));
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
        {!!this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (null)}
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.func
};

reactMixin(SignUp.prototype, React.addons.LinkedStateMixin);
