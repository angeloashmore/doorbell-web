import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import BillingsStore from 'stores/BillingsStore';
import PlansStore from 'stores/PlansStore';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

import Container from 'elements/Container';
import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';

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
    const billing = BillingsStore.forCurrentUser();
    const plan = PlansStore.withId(billing.get("plan").id);

    return (
      <DetailPanel>
        <Toolbar
          title="Overview"
          subtitle="Account"
          />
        <Container style={styles.container}>
          <DetailPanel.Group>
            <DetailPanel.Heading>Name</DetailPanel.Heading>
            <DetailPanel.TextPronounced>{user.get("name")}</DetailPanel.TextPronounced>
          </DetailPanel.Group>

          <DetailPanel.Group>
            <DetailPanel.Heading>Email</DetailPanel.Heading>
            <DetailPanel.TextPronounced>{user.get("email")}</DetailPanel.TextPronounced>
          </DetailPanel.Group>

          <DetailPanel.Group>
            <DetailPanel.Heading>Plan</DetailPanel.Heading>
            <DetailPanel.TextPronounced>{plan.get("name")}</DetailPanel.TextPronounced>
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
