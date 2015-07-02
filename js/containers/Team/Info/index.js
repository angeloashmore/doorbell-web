import React from 'react';
import Radium from 'radium';

import TeamsStore from 'stores/TeamsStore';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';

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
          title={team.get("name")}
          subtitle="Info"
          />
        <Container style={styles.container}>
          <DetailPanel.Group>
            <DetailPanel.Heading>Name</DetailPanel.Heading>
            <DetailPanel.TextPronounced>{team.get("name")}</DetailPanel.TextPronounced>
          </DetailPanel.Group>
        </Container>
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
