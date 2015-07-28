import React from 'react/addons';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, TeamsActions } from 'actions';
import { UserStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { DetailPanel, Toolbar, Form, Group } from 'elements';

@authenticatedComponent
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class TeamsNew extends React.Component {
  constructor(props) {
    super(props);

    const { user } = UserStore.getState();

    this.state = {
      name: '',
      email: user.email
    };

    const { navigator } = props;

    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.props.navigator.popView.bind(navigator)}
        >
        Cancel
      </Toolbar.Item>
    );
    navigator.setRightItem(
      <Toolbar.Item
        elType="button"
        type="submit"
        onClick={this.createTeam.bind(this)}
        >
        Create
      </Toolbar.Item>
    );
  }

  createTeam(e) {
    e.preventDefault();

    let data = {
      name: this.state.name,
      email: this.state.email
    };

    TeamsActions.create(data)
      .then(this.props.navigator.popView.bind(this.props.navigator))
      .then(() => NotificationsActions.create({ message: "Team created successfully." }))
      .catch(NotificationsActions.create);
  }

  render() {
    return (
      <div>
        <Group header="General" last={true}>
          <Group.Item title="Name">
            <Form.Input type="text" valueLink={this.linkState('name')} placeholder="Name" spellCheck={false} chromeless={true} hasTitle={true} />
          </Group.Item>
          <Group.Item title="Email" last={true}>
            <Form.Input type="email" valueLink={this.linkState('email')} placeholder="Team Email" chromeless={true} hasTitle={true} />
          </Group.Item>
        </Group>
      </div>
    );
  }
}
