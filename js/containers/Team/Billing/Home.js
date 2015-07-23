import React from 'react';
import reactMixin from 'react-mixin';
import Radium from 'radium';

import { BillingsActions } from 'actions';
import { BillingsStore, PlansStore } from 'stores';
import { authenticatedComponent } from 'decorators';

import { Group } from 'elements';

import Edit from './Edit';

@authenticatedComponent
@reactMixin.decorate(React.addons.LinkedStateMixin)
@Radium
export default class extends React.Component {
  constructor(props) {
    super(props);

    const { navigator } = props;

    navigator.setTitle("Billing");
    navigator.setLeftItem(
      <Toolbar.Item
        onClick={this.handleEditButton.bind(this)}
        >
        Edit
      </Toolbar.Item>
    );
    navigator.setRightItem(null);
  }

  handleEditButton() {
    this.props.navigator.pushView(
      <Edit team={this.props.team} />
    );
  }

  render() {
    const { team } = this.props;

    const billing = BillingsStore.forTeamWithId(team.id);
    const plan = PlansStore.withId(billing.plan_id);
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
          <Group.Item title="Email" last={true}>{billing.email}</Group.Item>
        </Group>

        <Group header="Payment Info" last={true}>
          {hasCard ? cardInfo : (
            <Group.Item title="Card">None</Group.Item>
          )}
        </Group>
      </div>
    );
  }
}
