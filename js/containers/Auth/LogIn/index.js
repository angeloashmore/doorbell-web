import React from 'react/addons';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import UserActions from 'actions/UserActions';
import Sheet from 'elements/Sheet';
import SheetHeader from 'elements/SheetHeading';
import Form from 'elements/Form';
import colors from 'styles/colors';

@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class LogIn extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }

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
      .then(() => router.transitionTo('/'))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <div style={styles.container}>
        <Sheet>
          <SheetHeader>Sign In</SheetHeader>
          <Form>
            <Form.Label title="Username">
              <Form.Input type="text" valueLink={this.linkState('username')} placeholder="Username" spellCheck={false} />
            </Form.Label>
            <Form.Label title="Password">
              <Form.Input type="password" valueLink={this.linkState('password')} placeholder="Password" />
            </Form.Label>
            <Form.Button title="Sign In" onClick={this.logIn.bind(this)} />
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
