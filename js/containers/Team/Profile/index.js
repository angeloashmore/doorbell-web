import React from 'react';
import { Navigation } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import NotificationsActions from 'actions/NotificationsActions';
import UserStore from 'stores/UserStore';
import TeamsActions from 'actions/TeamsActions';
import TeamsStore from 'stores/TeamsStore';
import ProfilesActions from 'actions/ProfilesActions';
import ProfilesStore from 'stores/ProfilesStore';

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
  constructor(props) {
    super(props);

    this.state = this.setupState(parseInt(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(parseInt(nextProps.params.id)));
  }

  setupState(id) {
    const team = TeamsStore.withId(id);
    const profile = ProfilesStore.forUserWithIdforTeamWithId(UserStore.getState().user.remote_id, team.id);

    return {
      team: team,
      profile: profile,
      title: profile.title
    };
  }

  updateTeam(e) {
    e.preventDefault();

    let attrs = {
      title: this.state.title
    };

    ProfilesActions.update(this.state.profile.id, attrs)
      .then(() => this.transitionTo("teamInfo", { id: this.state.team.id }))
      .catch((error) => NotificationsActions.createGeneric());
  }

  render() {
    const { team } = this.state;

    return (
      <DetailPanel>
        <Form>
          <Toolbar
            title="Profile"
            subtitle={this.state.team.name}
            leftItem={<Toolbar.Button disabled={true}>Cancel</Toolbar.Button>}
            rightItem={<Toolbar.Button type="submit" onClick={this.updateTeam.bind(this)}>Save</Toolbar.Button>}
            />

          <DetailPanel.Body>
            <Group header="General">
              <Group.Item title="Title" last={true}>
                <Form.Input valueLink={this.linkState('title')} placeholder="Title" chromeless={true} hasTitle={true} />
              </Group.Item>
            </Group>
          </DetailPanel.Body>
        </Form>
      </DetailPanel>
    );
  }
}
