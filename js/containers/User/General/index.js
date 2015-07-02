import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import NotificationsActions from 'actions/NotificationsActions';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Form from 'elements/Form';
import Group from 'elements/Group';

@authenticatedComponent
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor() {
    super();

    const { user } = UserStore.getState();

    this.state = {
      user: user,
      name: user.get("name"),
      email: user.get("email")
    }
  }

  update(e) {
    e.preventDefault();

    let attrs = {
      name: this.state.name,
      email: this.state.email
    };

    UserActions.update(this.state.user, attrs)
      .then(() => this.transitionTo("userOverview"))
      .catch((error) => NotificationsActions.createFromParseError(error));
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

          <Group header="General">
            <Group.Item title="Name">
              <Form.Input valueLink={this.linkState('name')} placeholder="Name" chromeless={true} hasTitle={true} />
            </Group.Item>

            <Group.Item title="Email" last={true}>
              <Form.Input valueLink={this.linkState('email')} placeholder="Email" type="email" chromeless={true} hasTitle={true} />
            </Group.Item>
          </Group>

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
