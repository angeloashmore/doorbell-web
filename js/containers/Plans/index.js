import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import AuthenticatedComponent from 'decorators/AuthenticatedComponent';
import UserStore from 'stores/UserStore';
import PlansStore from 'stores/PlansStore';
import UserActions from 'actions/UserActions';

export default AuthenticatedComponent(
  @connectToStores
  class extends React.Component {
    static getStores() {
      return [UserStore, PlansStore];
    }

    static getPropsFromStores() {
      return {
        user: UserStore.getState().user,
        plans: PlansStore.getState().plans
      }
    }

    handlePress(plan) {
      UserActions.subscribeTo(plan)
        .catch((error) => console.log(error));
    }

    render() {
      if (UserStore.hasCard()) {
        return (
          <ul>
            {this.props.plans.map((plan) => {
              return (
                <li key={plan.id}>
                  {plan.get("name")}
                  {this.props.user.get("plan") && this.props.user.get("plan").id == plan.id ? (
                    <strong>(subscribed!)</strong>
                  ) : (
                    <button onClick={() => this.handlePress(plan)}>Subscribe</button>
                  )}
                </li>
              );
            })}
          </ul>
        );

      } else {
        return (
          <p>
            No card, please add one before subscribing.<br />
            <Link to="billing">Billing</Link>
          </p>
        );

      }
    }
  }
);
