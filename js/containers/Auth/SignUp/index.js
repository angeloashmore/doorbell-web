import React from 'react/addons';
import { Navigation, Link } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import NotificationsActions from 'actions/NotificationsActions';
import Parse from 'lib/Parse';
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
      name: '',
      email: '',
      password: ''
    };
  }

  signUp(e) {
    e.preventDefault();

    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    UserActions.signUp(data)
      .then(() => this.transitionTo('teams'))
      .catch((error) => {
        switch (error.code) {
          case Parse.Error.OTHER_CAUSE:
            NotificationsActions.create({ message: error.message });
            break;
          default:
            NotificationsActions.createGeneric();
            break;
        }
      });
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
