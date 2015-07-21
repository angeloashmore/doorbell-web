import React from 'react';
import { Navigation } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import Actions from 'actions';
import authenticatedComponent from 'decorators/authenticatedComponent';
import TeamsStore from 'stores/TeamsStore';
import BillingsStore from 'stores/BillingsStore';
import PlansStore from 'stores/PlansStore';

import DetailPanel from 'elements/DetailPanel';
import Toolbar from 'elements/Toolbar';
import Group from 'elements/Group';
import Form from 'elements/Form';
import StripeCheckoutButton from 'elements/StripeCheckoutButton';

@authenticatedComponent
@connectToStores
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  static getStores() {
    return [BillingsStore];
  }

  static getPropsFromStores(props) {
    return BillingsStore.getState();
  }

  constructor(props) {
    super(props);
    this.state = this.setupState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(nextProps));
  }

  setupState(props) {
    const team = TeamsStore.withId(parseInt(props.params.id));
    const billing = BillingsStore.forTeamWithId(props.params.id);

    return {
      team,
      billing,
      email: billing.email
    };
  }

  updateBilling(e) {
    e.preventDefault();

    let attrs = {
      email: this.state.email
    };

    Actions.Billings.update(this.state.billing.id, attrs)
      .then(() => this.transitionTo("teamInfo", { id: this.state.team.id }))
      .catch((error) => Actions.Notifications.createGeneric());
  }

  replaceCard(token) {
    Actions.Billings.replaceCardWithTokenForId(this.state.billing.id, token.id)
      .catch((error) => Actions.Notifications.createGeneric());
  }

  render() {
    const { billing } = this.state;

    const team = TeamsStore.withId(parseInt(this.props.params.id));
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
        <Form>
          <Toolbar
            title="Billing"
            subtitle={team.name}
            leftItem={<Toolbar.Button disabled={true}>Cancel</Toolbar.Button>}
            rightItem={<Toolbar.Button type="submit" onClick={this.updateBilling.bind(this)}>Save</Toolbar.Button>}
            />

          <DetailPanel.Body>
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
          </DetailPanel.Body>
        </Form>
      </DetailPanel>
    );
  }
}
