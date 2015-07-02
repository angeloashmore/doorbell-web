import React from 'react';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Group from 'elements/Group';

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
    const { team } = this.state;

    return (
      <DetailPanel>
        <Toolbar
          title="Team Info"
          subtitle={this.state.team.get("name")}
          />

        <Group header="General">
          <Group.Item title="Name">{team.get("name")}</Group.Item>
          <Group.Item title="Team Email" last={true}>{team.get("email")}</Group.Item>
        </Group>
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
