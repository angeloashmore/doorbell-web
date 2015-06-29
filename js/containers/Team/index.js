import React from 'react';
import { RouteHandler } from 'react-router';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';
import Pane from 'components/Pane';
import PaneHeading from 'elements/PaneHeading';
import PaneItem from 'elements/PaneItem';

@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: TeamsStore.withId(props.params.id),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ team: TeamsStore.withId(nextProps.params.id) });
  }

  render() {
    return (
      <div style={styles.container}>
        <Pane>
          <PaneHeading>Menu</PaneHeading>
          <PaneItem to="teamInfo" params={this.props.params} key="info" title="Team Info" icon="team" />
          <PaneItem to="teamProfile" params={this.props.params} key="profile" title="Profile" icon="profile" />
          <PaneItem to="teamMembers" params={this.props.params} key="members" title="Members" icon="members" />
          <PaneItem to="teamBilling" params={this.props.params} key="billing" title="Billing" icon="billing" />
          <PaneItem to="teamSettings" params={this.props.params} key="settings" title="Settings" icon="settings" />
        </Pane>

        <RouteHandler />
      </div>
    );
  }
}

const styles = {
  container: {
    alignContent: "stretch",
    display: "flex"
  }
}
