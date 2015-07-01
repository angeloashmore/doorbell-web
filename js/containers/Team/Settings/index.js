import React from 'react';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';
import HeaderBar from 'elements/HeaderBar';
import Panel from 'elements/Panel';
import Form from 'elements/Form';

@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: TeamsStore.withId(props.params.id)
    }
  }

  render() {
    const headerBar = (
      <HeaderBar
        title={this.state.team.get("name")}
        subtitle="Settings"
        leftButton={<HeaderBar.Button disabled={true}>Cancel</HeaderBar.Button>}
        rightButton={<HeaderBar.Button>Save</HeaderBar.Button>}
      />
    );

    return (
      <div style={styles.container}>
        {headerBar}
        <Panel>
          <Panel.Heading>Team Name</Panel.Heading>
          <Form.Input value={this.state.team.get("name")} placeholder={Team Name} />

          <Panel.Heading>Delete This Team</Panel.Heading>
          <p>Once you delete a team, there is no going back. Please be certain.</p>
          <Form.Button title="Delete This Team" />
        </Panel>
      </div>
    );
  }
}

const styles = {
  container: {
    flexGrow: 1
  }
};
