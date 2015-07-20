import React from 'react';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import TeamsStore from 'stores/TeamsStore';
import ProfilesStore from 'stores/ProfilesStore';

import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Group from 'elements/Group';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setupState(props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(nextProps.params.id));
  }

  setupState(id) {
    const team = TeamsStore.withId(parseInt(id));
    const profiles = ProfilesStore.forTeamWithId(team.id);
    return { team: team, profiles: profiles };
  }

  render() {
    const { team, profiles } = this.state;

    const memberGroupItems = [];
    profiles.forEach(profile => {
      memberGroupItems.push(
        <Group.Item>
          {profile.title}
        </Group.Item>
      );
    });

    return (
      <DetailPanel>
        <Toolbar
          title="Members"
          subtitle={this.state.team.name}
          />

        <DetailPanel.Body>
          <Group header="Members">
            {[memberGroupItems]}
          </Group>
        </DetailPanel.Body>
      </DetailPanel>
    );
  }
}
