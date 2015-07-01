import React from 'react/addons';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import TeamsActions from 'actions/TeamsActions';
import Panel from 'elements/Panel';
import Sheet from 'elements/Sheet';
import Form from 'elements/Form';
import colors from 'styles/colors';

@reactMixin.decorate(Navigation)
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
      email: 'angelo@doorbell.im'
    };
  }

  create(e) {
    e.preventDefault();

    let data = {
      name: this.state.name,
      email: this.state.email
    };

    TeamsActions.create(data)
      .then(() => this.transitionTo('teams'))
      .catch((error) => {
        switch (error.code) {
          default:
            NotificationsActions.createGeneric();
            break;
        }
      });
  }

  render() {
    return (
      <Panel style={styles.panel}>
        <Sheet>
          <Sheet.Heading>New Team</Sheet.Heading>
          <Form>
            <Form.Label title="Name">
              <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" spellCheck={false} />
            </Form.Label>
            <Form.Label title="Team Email">
              <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Team Email" />
            </Form.Label>
            <Form.Button title="Create Team" onClick={this.create.bind(this)} />
          </Form>
        </Sheet>
      </Panel>
    );
  }
}

const styles = {
  panel: {
    alignItems: "center",
    justifyContent: "center"
  }
};
