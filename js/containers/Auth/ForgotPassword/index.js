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

  resetPassword(e) {
    e.preventDefault();

    UserActions.resetPassword(this.state.email)
      .then(() => {
        this.transitionTo('signIn');
        NotificationsActions.create({ message: "An email was sent to you with a link to reset your password." });
      })
      .catch((error) => NotificationsActions.createFromParseError(error));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <Sheet.Heading>Forgot Password</Sheet.Heading>
          <Form style={styles.form}>
            <Form.Label title="Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Email" spellCheck={false} />
            </Form.Label>
            <Form.Button title="Reset Password" onClick={this.resetPassword.bind(this)} />
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
