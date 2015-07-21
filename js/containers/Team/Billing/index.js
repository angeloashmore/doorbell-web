import React from 'react';
import { Navigation } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { authenticatedComponent } from 'decorators';
import Actions from 'actions';
import Stores from 'stores';

import { DetailPanel, Toolbar, Group, Form, StripeCheckoutButton } from 'elements';

@authenticatedComponent
@connectToStores
@reactMixin.decorate(Navigation)
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  static getStores() {
    return [Stores.Billings];
  }

  static getPropsFromStores(props) {
    return Stores.Billings.getState();
  }

  constructor(props) {
    super(props);
    this.state = this.setupState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.setupState(nextProps));
  }

  setupState(props) {
    const team = Stores.Teams.withId(parseInt(props.params.id));
    const billing = Stores.Billings.forTeamWithId(props.params.id);

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

    const team = Stores.Teams.withId(parseInt(this.props.params.id));
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
