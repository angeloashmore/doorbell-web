import React from 'react/addons';
import reactMixin from 'react-mixin';

import UserActions from 'actions/UserActions';

export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      name: '',
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
      name: this.state.name
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
          <input type="text" valueLink={this.linkState('name')} placeholder="Name" />
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
