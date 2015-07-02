import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Group from 'elements/Group';

@authenticatedComponent
@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores(props) {
    return UserStore.getState();
  }

  render() {
    const { user } = this.props;

    return (
      <DetailPanel>
        <Toolbar
          title="Billing"
          subtitle="Account"
          />
        <Container style={styles.container}>
          <DetailPanel.Group>
            <DetailPanel.Heading>Name</DetailPanel.Heading>
            <DetailPanel.TextPronounced>{user.get("name")}</DetailPanel.TextPronounced>
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
