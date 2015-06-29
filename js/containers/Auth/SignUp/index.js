import React from 'react/addons';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import UserActions from 'actions/UserActions';
import Sheet from 'elements/Sheet';
import Form from 'elements/Form';
import colors from 'styles/colors';

@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      name: '',
      professional: true,
      errorMessage: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    var { router } = this.context;

    let data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      professional: this.state.professional
    };

    UserActions.signUp(data)
      .then(() => router.transitionTo('/'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <Sheet.Heading>Sign Up</Sheet.Heading>
          <Form>
            <Form.Label title="Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Email" />
            </Form.Label>
            <Form.Label title="Password">
              <Form.Input type="password" valueLink={this.linkState('password')} placeholder="Password" />
            </Form.Label>
            <Form.Label title="Name">
              <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" />
            </Form.Label>
            <Form.Label title="Professional">
              <input type="checkbox" valueLink={this.linkState('professional')} checked={this.linkState('professional')} />
            </Form.Label>
            <Form.Button title="Sign Up" onClick={this.signUp.bind(this)} />
          </Form>
          {!!this.state.errorMessage ? (<p>{this.state.errorMessage}</p>) : (null)}
        </Sheet>
      </div>
    );
  }
}

const styles = {
  container: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%"
  }
};
