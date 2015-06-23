import React from 'react/addons';
import reactMixin from 'react-mixin';

import TeamsActions from 'actions/TeamsActions';

@reactMixin.decorate(React.addons.LinkedStateMixin)
export default class TeamsNew extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      name: '',
      email: 'angelo@doorbell.im',
      errorMessage: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    var { router } = this.context;

    let data = {
      name: this.state.name,
      email: this.state.email
    };

    TeamsActions.create(data)
      .then(() => router.transitionTo('teams'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div>
        <p>Create</p>
        <form>
          <input type="text" valueLink={this.linkState('name')} placeholder="Name" />
          <input type="email" valueLink={this.linkState('email')} placeholder="Email" />
          <button type="submit" onClick={this.signUp.bind(this)}>Submit</button>
        </form>
        {!!this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (null)}
      </div>
    );
  }
}
