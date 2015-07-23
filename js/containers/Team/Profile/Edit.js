import React from 'react';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { NotificationsActions, ProfilesActions } from 'actions';
import { ProfilesStore, UserStore } from 'stores';
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
    const profile = ProfilesStore.forUserWithIdforTeamWithId(user.remote_id, team.id);

    this.state = {
      profile,
      title: profile.title,
      email: profile.email
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
        onClick={this.updateProfile.bind(this)}
        >
        Save
      </Toolbar.Item>
    );
  }

  updateProfile(e) {
    e.preventDefault();

    let attrs = {
      title: this.state.title,
      email: this.state.email
    };

    ProfilesActions.update(this.state.profile.id, attrs)
      .then(this.props.navigator.popView.bind(this.props.navigator))
      .then(() => NotificationsActions.create({ message: "Profile updated successfully." }))
      .catch((error) => NotificationsActions.createGeneric());
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
