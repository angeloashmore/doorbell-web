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
      team: TeamsStore.withId(props.params.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ team: TeamsStore.withId(nextProps.params.id) });
  }

  render() {
    return (
      <div style={styles.container}>
        <Pane>
          <PaneHeading>{this.state.team.get("name")}</PaneHeading>
          <PaneItem to="/" title="Team Info" icon="team" />
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
