import React from 'react/addons';
import { Navigation, Link } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import Parse from 'lib/Parse';
import NotificationsActions from 'actions/NotificationsActions';
import UserActions from 'actions/UserActions';
import Sheet from 'elements/Sheet';
import Form from 'elements/Form';
import commonStyles from 'styles/commonStyles';

@reactMixin.decorate(Navigation)
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
      password: ''
    };
  }

  signIn(e) {
    e.preventDefault();

    UserActions.signIn(this.state.email, this.state.password)
      .then(() => this.transitionTo('teams'))
      .catch((error) => NotificationsActions.create({ message: "Incorrect username or password. Forgot your password?" }));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <Sheet.Heading>Sign In</Sheet.Heading>
          <Form style={styles.form}>
            <Form.Label title="Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Email" spellCheck={false} />
            </Form.Label>
            <Form.Label title="Password">
              <Form.Input type="password" valueLink={this.linkState('password')} placeholder="Password" />
            </Form.Label>
            <Form.Button title="Sign In" type="submit" onClick={this.signIn.bind(this)} />
          </Form>
          <p style={styles.message}>
            <Link to="forgotPassword" key="forgotPassword" style={styles.link}>Forgot password?</Link>
          </p>
          <p style={[styles.message, styles.messageLast]}>
            Don't have an account? <Link to="signUp" key="signUp" style={styles.link}>Sign up</Link>
          </p>
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

  link: commonStyles.get("link")
};
