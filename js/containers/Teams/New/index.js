import React from 'react/addons';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import TeamsActions from 'actions/TeamsActions';
import Sheet from 'elements/Sheet';
import Form from 'elements/Form';
import colors from 'styles/colors';

@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
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

  create(e) {
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
      <div style={styles.container}>
        <Sheet>
          <Sheet.Heading>New Team</Sheet.Heading>
          <Form style={styles.form}>
            <Form.Label title="Name">
              <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" spellCheck={false} />
            </Form.Label>
            <Form.Label title="Team Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Team Email" />
            </Form.Label>
            <Form.Button title="Create Team" onClick={this.create.bind(this)} />
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
