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
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  signIn(e) {
    e.preventDefault();

    var { router } = this.context;

    UserActions.signIn(this.state.email, this.state.password)
      .then(() => router.transitionTo('teams'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <Sheet.Heading>Sign In</Sheet.Heading>
          <Form>
            <Form.Label title="Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Email" />
            </Form.Label>
            <Form.Label title="Password">
              <Form.Input type="password" valueLink={this.linkState('password')} placeholder="Password" />
            </Form.Label>
            <Form.Button title="Sign In" onClick={this.signIn.bind(this)} />
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
