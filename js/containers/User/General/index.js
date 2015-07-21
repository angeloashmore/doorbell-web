import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import Actions from 'actions';
import { authenticatedComponent } from 'decorators';
import Stores from 'stores';

import { Container, DetailPanel, Toolbar, Form, Group } from 'elements';

@authenticatedComponent
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor() {
    super();

    const { user } = Stores.User.getState();

    this.state = {
      user: user,
      name: user.name,
      email: user.email
    }
  }

  update(e) {
    e.preventDefault();

    let attrs = {
      name: this.state.name,
      email: this.state.email
    };

    Actions.User.update(this.state.user, attrs)
      .then(() => this.transitionTo("userOverview"))
      .catch((error) => Actions.Notifications.createGeneric());
  }

  render() {
    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title="General"
            subtitle="Account"
            leftItem={<Toolbar.Button disabled={true}>Cancel</Toolbar.Button>}
            rightItem={<Toolbar.Button type="submit" onClick={this.update.bind(this)}>Save</Toolbar.Button>}
            />

          <DetailPanel.Body>
            <Group header="General" footer="Your email is kept private and is only used for communication from Doorbell.">
              <Group.Item title="Name">
                <Form.Input valueLink={this.linkState('name')} placeholder="Name" chromeless={true} hasTitle={true} />
              </Group.Item>

              <Group.Item title="Email" last={true}>
                <Form.Input valueLink={this.linkState('email')} placeholder="Email" type="email" chromeless={true} hasTitle={true} />
              </Group.Item>
            </Group>
          </DetailPanel.Body>

        </Form>
      </DetailPanel>
    );
  }
}

const styles = {
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    padding: 45
  }
};
