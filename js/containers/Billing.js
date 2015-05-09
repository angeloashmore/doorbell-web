import React from 'react';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';
import StripeCardForm from '../components/StripeCardForm';

class Billing extends React.Component {
  onAddCardSuccess() {
    console.log("Success! :)");
  }

  onAddCardFailure(error) {
    console.log("Failure! :(")
  }

  render() {
    return(
      <div>
        <dl>
          <dt>Card Brand</dt>
          <dd>{this.props.user.get("billingBrand")}</dd>
          <dt>Card Last 4</dt>
          <dd>{this.props.user.get("billingLast4")}</dd>
        </dl>
        <StripeCardForm
          onSuccess={this.onAddCardSuccess.bind(this)}
          onFailure={this.onAddCardFailure.bind(this)} />
      </div>
    );
  }
}

export default AuthenticatedComponent(Billing);
