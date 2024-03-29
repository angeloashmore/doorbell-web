import React from 'react';
import Radium from 'radium';

import { BillingsStore, PlansStore, UserStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Container, DetailPanel, Toolbar, Group } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  render() {
    const { user } = UserStore.getState();
    const billing = BillingsStore.forCurrentUser();
    const plan = PlansStore.withId(billing.plan_id);

    return (
      <DetailPanel>
        <Toolbar
          title="Overview"
          subtitle="Account"
          />

        <DetailPanel.Body>
          <Group header="General" footer="Your email is kept private and is only used for communication from Doorbell.">
            <Group.Item title="Name">
              {user.name}
            </Group.Item>

            <Group.Item title="Email" last={true}>
              {user.email}
            </Group.Item>
          </Group>

          <Group header="Plan & Billing">
            <Group.Item title="Plan" last={true}>
              {plan.name}
            </Group.Item>
          </Group>
        </DetailPanel.Body>

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
