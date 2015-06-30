import React from 'react';

import TeamsStore from 'stores/TeamsStore';
import Panel from 'elements/Panel';

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
      <Panel>
        <Panel.Heading>Name</Panel.Heading>
        <Panel.TextPronounced>{this.state.team.get("name")}</Panel.TextPronounced>
      </Panel>
    );
  }
}
