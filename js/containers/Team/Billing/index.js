import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import Radium from 'radium';

import authenticatedComponent from 'decorators/authenticatedComponent';
import NotificationsActions from 'actions/NotificationsActions';
import TeamsStore from 'stores/TeamsStore';
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
    return {
      billing: BillingsStore.forTeamWithId(props.params.id)
    };
  }

  replaceCard(token) {
    BillingsActions.replaceCardWithTokenForId(this.state.billing.id, token.id)
      .catch((error) => NotificationsActions.createGeneric());
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
        <Toolbar
          title="Billing"
          subtitle={team.name}
          />
        <Group header="Plan">
          <Group.Item title="Name">{plan.name}</Group.Item>
        </Group>

        <Group header="Payment Info">
          {hasCard ? cardInfo : ""}

          <Group.Button>
            <StripeCheckoutButton title={hasCard ? "Change Card" : "Add Card"} onSuccess={this.replaceCard.bind(this)} />
          </Group.Button>
        </Group>
      </DetailPanel>
    );
  }
}
