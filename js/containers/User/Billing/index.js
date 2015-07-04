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

  addCard(token) {
    const billing = BillingsStore.forCurrentUser();
    BillingsActions.addCardWithTokenForId(billing.id, token.id)
      .catch((error) => NotificationsActions.createFromParseError(error));
  }

  render() {
    const { user } = this.props;
    const billing = BillingsStore.forCurrentUser();
    const hasCard = BillingsStore.hasCardForId(billing.id);
    const plan = PlansStore.withId(billing.get("plan").id);

    return (
      <DetailPanel>
        <Toolbar
          title="Billing"
          subtitle="Account"
          />
        <Group header="Plan">
          <Group.Item title="Name">{plan.get("name")}</Group.Item>
        </Group>

        <Group header="Payment Info">
          <Group.Item title="Brand">{hasCard ? billing.get("brand") : "None"}</Group.Item>
          <Group.Item title="Last 4">{hasCard ? billing.get("last4") : "None"}</Group.Item>
          <Group.Item title="Exp Date">{hasCard ? `${billing.get("expMonth")}/${billing.get("expYear")}` : "None"}</Group.Item>
          <Group.Button>
            <StripeCheckoutButton title={hasCard ? "Change Card" : "Add Card"} onSuccess={this.addCard} />
          </Group.Button>
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
