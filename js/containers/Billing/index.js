import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';

import authenticatedComponent from 'decorators/authenticatedComponent';
import StripeCheckoutButton from 'components/StripeCheckoutButton';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

@authenticatedComponent
@connectToStores
export default class extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  onSuccess(token) {
    UserActions.addCardToken(token.id)
      .catch((error) => console.log(error));
  }

  render() {
    return(
      <div>
        <dl>
          <dt>Card Brand</dt>
          <dd>{this.props.user.get("billing").get("brand")}</dd>
          <dt>Card Last 4</dt>
          <dd>{this.props.user.get("billing").get("last4")}</dd>
        </dl>
        <StripeCheckoutButton onSuccess={this.onSuccess} />
      </div>
    );
  }
}
