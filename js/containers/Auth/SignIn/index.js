import React from 'react/addons';
import { Navigation, Link } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { UserActions } from 'actions';
import commonStyles from 'styles/commonStyles';

import { Sheet, Form } from 'elements';

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
      .then(() => this.transitionTo("teams"))
      // .catch(error => Actions.Notifications.create({ message: error.details.error_description }));
      .catch(error => console.log(error));
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
            <Form.Button type="submit" onClick={this.signIn.bind(this)}>Sign In</Form.Button>
          </Form>
          <p style={styles.message}>
            <Link to="resetPassword" key="resetPassword" style={styles.link}>Forgot password?</Link>
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
