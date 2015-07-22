import React from 'react';
import Radium from 'radium';

import { BillingsActions } from 'actions';
import { BillingsStore, PlansStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { DetailPanel, Toolbar, Group, StripeCheckoutButton } from 'elements';

@authenticatedComponent
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);
    const billing = BillingsStore.forCurrentUser();
    this.state = { billing };
  }

  replaceCard(token) {
    BillingsActions.replaceCardWithTokenForId(this.state.billing.id, token.id)
      .catch((error) => NotificationsActions.createGeneric());
  }

  render() {
    const { billing } = this.state;
    const hasCard = BillingsStore.hasCardForId(billing.id);
    const plan = PlansStore.withId(billing.plan_id);

    const cardInfo = (
      <div>
        <Group.Item title="Brand">{hasCard ? billing.brand : "None"}</Group.Item>
        <Group.Item title="Last 4">{hasCard ? billing.last4 : "None"}</Group.Item>
        <Group.Item title="Exp Date">{hasCard ? `${billing.exp_month}/${billing.exp_year}` : "None"}</Group.Item>
      </div>
    );

    return (
      <DetailPanel>
        <Toolbar
          title="Billing"
          subtitle="Account"
          />

        <DetailPanel.Body>
          <Group header="Plan">
            <Group.Item title="Name">{plan.name}</Group.Item>
          </Group>

          <Group header="Payment Info">
            {hasCard ? cardInfo : ""}

            <Group.Button>
              <StripeCheckoutButton title={hasCard ? "Change Card" : "Add Card"} onSuccess={this.replaceCard} />
            </Group.Button>
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
