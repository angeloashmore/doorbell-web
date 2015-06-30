import React from 'react';
import { RouteHandler } from 'react-router';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';
import Pane from 'elements/Pane';

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
        <Pane selectedKey="info">
          <Pane.Heading>Menu</Pane.Heading>
          <Pane.Item to="teamInfo" params={this.props.params} key="info" title="Team Info" icon="team" />
          <Pane.Item to="teamProfile" params={this.props.params} key="profile" title="Profile" icon="profile" />
          <Pane.Item to="teamMembers" params={this.props.params} key="members" title="Members" icon="members" />
          <Pane.Item to="teamBilling" params={this.props.params} key="billing" title="Billing" icon="billing" />
          <Pane.Item to="teamSettings" params={this.props.params} key="settings" title="Settings" icon="settings" />
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
