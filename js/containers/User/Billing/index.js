import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import NotificationsActions from 'actions/NotificationsActions';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';
import BillingsStore from 'stores/BillingsStore';
import BillingsActions from 'actions/BillingsActions';
import PlansStore from 'stores/PlansStore';

import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Group from 'elements/Group';
import StripeCheckoutButton from 'elements/StripeCheckoutButton';

@authenticatedComponent
@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [UserStore, BillingsStore];
  }

  static getPropsFromStores(props) {
    return Object.assign(
      UserStore.getState(),
      BillingsStore.getState()
    );
  }

  replaceCard(token) {
    const billing = BillingsStore.forCurrentUser();
    BillingsActions.replaceCardWithTokenForId(billing.id, token.id)
      .catch((error) => NotificationsActions.createGeneric());
  }

  render() {
    const { user } = this.props;
    const billing = BillingsStore.forCurrentUser();
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
