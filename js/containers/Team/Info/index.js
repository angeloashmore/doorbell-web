import React from 'react';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';
import Container from 'elements/Container';
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
    return (
      <Container>
        <HeaderBar
          title={this.state.team.get("name")}
          subtitle="Info"
        />

        <Panel>
          <Panel.Heading>Name</Panel.Heading>
          <Panel.TextPronounced>{this.state.team.get("name")}</Panel.TextPronounced>
        </Panel>
      </Container>
    );
  }
}
