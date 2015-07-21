import React from 'react/addons';
import { Navigation, Link } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import Actions from 'actions';
import commonStyles from 'styles/commonStyles';

import { Sheet, Form, BackButton } from 'elements';

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

  resetPassword(e) {
    e.preventDefault();

    Actions.User.resetPassword(this.state.email, this.state.password)
      .then(() => {
        this.transitionTo('signIn');
        Actions.Notifications.create({ message: "An email was sent to you with a link to activate your new password." });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <BackButton style={styles.backButton} />
          <Sheet.Heading>Reset Password</Sheet.Heading>
          <p style={styles.message}>
            Enter your new password below and we'll email you a link to activate it.
          </p>
          <Form style={styles.form}>
            <Form.Label title="Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Email" spellCheck={false} />
            </Form.Label>
            <Form.Label title="New Password">
              <Form.Input type="password" valueLink={this.linkState('password')} placeholder="New Password" spellCheck={false} />
            </Form.Label>
            <Form.Button onClick={this.resetPassword.bind(this)}>Reset Password</Form.Button>
          </Form>
          <p style={[styles.message, styles.messageLast]}>
            Remembered it? <Link to="signIn" key="signIn" style={styles.link}>Sign in</Link>
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

  backButton: {
    marginBottom: 10
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
