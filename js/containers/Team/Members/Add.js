import React from 'react';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, RolesActions } from 'actions';
import { ProfilesStore, TeamsStore, UsersStore } from 'stores';
import { authenticatedComponent } from 'decorators';
import colors from "styles/colors";

import { Form, Group, ProfilePhoto, Toolbar } from 'elements';

@authenticatedComponent
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { navigator } = props;

    this.state = {
      email: '',
      role: "member"
    };

    navigator.setTitle("Add Member");
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
        onClick={this.addMember.bind(this)}
        >
        Add
      </Toolbar.Item>
    );
  }

  addMember(e) {
    e.preventDefault();

    let attrs = {
      team_id: this.props.team.id,
      email: this.state.email,
      role: this.state.role
    };

    RolesActions.create(attrs)
      .then(() => NotificationsActions.create({ message: "Member added successfully." }))
      .catch((error) => NotificationsActions.createGeneric());
  }

  render() {
    const { team } = this.props;

    const roleFooter = (
      <ul>
        <li>Owner &ndash; Manage everything.</li>
        <li>Admin &ndash; Manage members.</li>
        <li>Member &ndash; Available to chat and manage profile.</li>
      </ul>
    );

    return (
      <div>
        <Group header="Member Details" footer="Please ensure an account with this email address already exists.">
          <Group.Item title="Email">
            <Form.Input valueLink={this.linkState('email')} placeholder="Email" chromeless={true} hasTitle={true} />
          </Group.Item>
        </Group>

        <Group header="Role Details" footer={roleFooter} last={true}>
          <Group.Item title="Role">
            <Form.Select valueLink={this.linkState('role')} selected="member" chromeless={true} hasTitle={true}>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </Form.Select>
          </Group.Item>
        </Group>
      </div>
    );
  }
}

const styles = {
  photo: {
    height: 40,
    marginRight: 10,
    width: 40
  },

  nameAndTitle: {
    marginRight: 15,
  },

  name: {
    color: colors.get("textPronounced"),
    display: "block"
  },

  title: {
    fontSize: 14,
    display: "block"
  }
};
