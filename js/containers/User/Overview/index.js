import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import BillingsStore from 'stores/BillingsStore';
import PlansStore from 'stores/PlansStore';
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
    const billing = BillingsStore.forCurrentUser();
    const plan = PlansStore.withId(billing.get("plan").id);

    return (
      <DetailPanel>
        <Toolbar
          title="Overview"
          subtitle="Account"
          />

        <Group header="General" footer="Your email is kept private and only used for communication from us.">
          <Group.Item title="Name">
            {user.get("name")}
          </Group.Item>

          <Group.Item title="Email" last={true}>
            {user.get("email")}
          </Group.Item>
        </Group>

        <Group header="Plan & Billing">
          <Group.Item title="Plan" last={true}>
            {plan.get("name")}
          </Group.Item>
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
