import React from 'react/addons';
import reactMixin from 'react-mixin';

import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

export default class LogIn extends React.Component {
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

    UserActions.logInUser(this.state.username, this.state.password)
      .then(() => router.transitionTo('dashboard'))
      .catch((error) => this.setState({ errorMessage: error.message }));
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

LogIn.contextTypes = {
  router: React.PropTypes.func
};

reactMixin(LogIn.prototype, React.addons.LinkedStateMixin);
