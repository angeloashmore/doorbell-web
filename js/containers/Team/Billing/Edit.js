import React from 'react';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { BillingsActions, NotificationsActions } from 'actions';
import { BillingsStore, PlansStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Group, StripeCheckoutButton } from 'elements';

@authenticatedComponent
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { team, navigator } = props;

    const billing = BillingsStore.forTeamWithId(team.id);
    const plan = PlansStore.withId(billing.plan_id);

    this.state = {
      billing, plan,
      email: billing.email
    };

    navigator.setTitle("Edit Billing");
    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.props.navigator.popView.bind(navigator)}
        >
        Cancel
      </Toolbar.Item>
    );
    navigator.setRightItem(
      <Toolbar.Item
        elType="button"
        type="submit"
        onClick={this.updateBilling.bind(this)}
        >
        Save
      </Toolbar.Item>
    );
  }

  updateBilling(e) {
    e.preventDefault();

    let attrs = {
      email: this.state.email
    };

    BillingsActions.update(this.state.billing.id, attrs)
      .then(this.props.navigator.popView.bind(this.props.navigator))
      .then(() => NotificationsActions.create({ message: "Billing updated successfully." }))
      .catch(console.log);
  }

  replaceCard(token) {
    BillingsActions.replaceCardWithTokenForId(this.state.billing.id, token.id)
      .then(() => NotificationsActions.create({ message: "Card changed successfully." }))
      .catch(console.log);
  }

  render() {
    const { billing, plan, team } = this.state;
    const hasCard = BillingsStore.hasCardForId(billing.id);

    const cardInfo = (
      <div>
        <Group.Item title="Brand">{hasCard ? billing.brand : "None"}</Group.Item>
        <Group.Item title="Last 4">{hasCard ? billing.last4 : "None"}</Group.Item>
        <Group.Item title="Exp Date">{hasCard ? `${billing.exp_month}/${billing.exp_year}` : "None"}</Group.Item>
      </div>
    );

    return (
      <div>
        <Group header="Plan">
          <Group.Item title="Name" last={true}>{plan.name}</Group.Item>
        </Group>

        <Group header="Contact" footer="This email is used for all billing communication including invoices and receipts.">
          <Group.Item title="Email" last={true}>
            <Form.Input valueLink={this.linkState('email')} placeholder="Email" chromeless={true} hasTitle={true} />
          </Group.Item>
        </Group>

        <Group header="Payment Info" last={true}>
          {hasCard ? cardInfo : ""}

          <Group.Button last={true}>
            <StripeCheckoutButton title={hasCard ? "Change Card" : "Add Card"} onSuccess={this.replaceCard.bind(this)} />
          </Group.Button>
        </Group>
      </div>
    );
  }
}
