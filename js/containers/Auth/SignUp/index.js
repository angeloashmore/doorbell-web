import React from 'react/addons';
import { Link } from 'react-router';
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
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    var { router } = this.context;

    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    UserActions.signUp(data)
      .then(() => router.transitionTo('teams'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <Sheet.Heading>Sign Up</Sheet.Heading>
          <Form style={styles.form}>
            <Form.Label title="Name">
              <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" spellCheck={false} />
            </Form.Label>
            <Form.Label title="Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Email" spellCheck={false} />
            </Form.Label>
            <Form.Label title="Password">
              <Form.Input type="password" valueLink={this.linkState('password')} placeholder="Password" />
            </Form.Label>
            <Form.Button title="Sign Up" onClick={this.signUp.bind(this)} />
          </Form>
          <p style={[styles.message, styles.messageLast]}>
            Already have an account? <Link to="signIn" style={styles.link}>Sign in</Link>
          </p>
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
  },

  form: {
    marginBottom: 30
  },

  message: {
    marginBottom: 20,
    textAlign: "center"
  },

  messageLast: {
    marginBottom: 0
  },

  link: {
    color: colors.red
  }
};
