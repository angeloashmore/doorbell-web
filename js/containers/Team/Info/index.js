import React from 'react';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';
import HeaderBar from 'elements/HeaderBar';
import Panel from 'elements/Panel';

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
    const headerBar = (
      <HeaderBar
        title={this.state.team.get("name")}
        subtitle="Info"
      />
    );

    return (
      <div style={styles.container}>
        {headerBar}
        <Panel>
          <Panel.Heading>Name</Panel.Heading>
          <Panel.TextPronounced>{this.state.team.get("name")}</Panel.TextPronounced>
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
