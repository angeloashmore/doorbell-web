import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import Actions from 'actions';
import authenticatedComponent from 'decorators/authenticatedComponent';
import Stores from 'stores';

import { DetailPanel, Toolbar, Group, StripeCheckoutButton } from 'elements';

@authenticatedComponent
@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [Stores.User, Stores.Billings];
  }

  static getPropsFromStores(props) {
    return Object.assign(
      Stores.User.getState(),
      Stores.Billings.getState()
    );
  }

  replaceCard(token) {
    const billing = Stores.Billings.forCurrentUser();
    Actions.Billings.replaceCardWithTokenForId(billing.id, token.id)
      .catch((error) => Actions.Notifications.createGeneric());
  }

  render() {
    const { user } = this.props;
    const billing = Stores.Billings.forCurrentUser();
    const hasCard = Stores.Billings.hasCardForId(billing.id);
    const plan = Stores.Plans.withId(billing.plan_id);

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
