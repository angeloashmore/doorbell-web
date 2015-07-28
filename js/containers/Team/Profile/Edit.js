import React from 'react';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, TeamMembersActions } from 'actions';
import { TeamMembersStore, UserStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Form, Group, Toolbar  } from 'elements';

@authenticatedComponent
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { team, navigator } = props;
    const { user } = UserStore.getState();
    const team_member = TeamMembersStore.forUserWithIdforTeamWithId(user.remote_id, team.id);

    this.state = {
      team_member,
      title: team_member.title,
      email: team_member.email
    };

    navigator.setTitle("Edit My Profile");
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
        onClick={this.updateTeamMember.bind(this)}
        >
        Save
      </Toolbar.Item>
    );
  }

  updateTeamMember(e) {
    e.preventDefault();

    let attrs = {
      title: this.state.title,
      email: this.state.email
    };

    TeamMembersActions.update(this.state.team_member.id, attrs)
      .then(this.props.navigator.popView.bind(this.props.navigator))
      .then(() => NotificationsActions.create({ message: "Profile updated successfully." }))
      .catch(NotificationsActions.create);
  }

  render() {
    return (
      <div>
        <Group header="General">
          <Group.Item title="Title">
            <Form.Input valueLink={this.linkState('title')} placeholder="Title" chromeless={true} hasTitle={true} />
          </Group.Item>
          <Group.Item title="Email" last={true}>
            <Form.Input valueLink={this.linkState('email')} placeholder="Email" chromeless={true} hasTitle={true} />
          </Group.Item>
        </Group>
      </div>
    );
  }
}
