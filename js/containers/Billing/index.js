import React from 'react';
import { Link } from 'react-router';

import AuthenticatedComponent from 'decorators/AuthenticatedComponent';
import StripeCheckoutButton from 'components/StripeCheckoutButton';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

export default AuthenticatedComponent(
  class extends React.Component {
    constructor() {
      super();

      this.state = {
        loadingBilling: true,
        errorLoadingBilling: false
      }
    }

    componentWillMount() {
      if (!UserStore.getState().billing) {
        UserActions.fetchBilling(UserStore.getState().user)
          .then(() => this.setState({ loadingBilling: false }))
          .catch((error) => this.setState({ loadingBilling: false, errorLoadingBilling: true }));
      } else {
        this.setState({ loadingBilling: false });
      }
    }

    onSuccess(token) {
      UserActions.addCardToken(token.id)
        .catch((error) => console.log(error));
    }

    render() {
      return(
        <div>
          {this.state.loadingBilling ? (
            <p>Loading...</p>
          ) : (
            <div>
              <dl>
                <dt>Card Brand</dt>
                <dd>{UserStore.getState().billing.get("brand")}</dd>
                <dt>Card Last 4</dt>
                <dd>{UserStore.getState().billing.get("last4")}</dd>
              </dl>
              <StripeCheckoutButton onSuccess={this.onSuccess} />
            </div>
          )}
        </div>
      );
    }
  }
);
