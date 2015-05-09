import React from 'react';
import ReactScriptLoader from 'react-script-loader';

import config from '../config';

import AuthenticationActions from '../actions/AuthenticationActions';
import AuthenticationStore from '../stores/AuthenticationStore';

const ReactScriptLoaderMixin = ReactScriptLoader.ReactScriptLoaderMixin;

export default class StripeCheckoutButton extends React.Component {
  constructor() {
    super();

    this.state = {
      scriptLoading: true,
      scriptLoadError: false
    };
  }

  getScriptURL() {
    return 'https://checkout.stripe.com/checkout.js';
  }

  onScriptLoaded() {
    this.setState({ scriptLoading: false });
  }

  onScriptError() {
    this.setState({ scriptLoading: false, scriptLoadError: true });
  }

  onSuccessfulToken(token) {
    AuthenticationActions.addCardToken(token.id)
  }

  handler() {
    return StripeCheckout.configure({
      key: config.Stripe.PUBLISHABLE_KEY,
      token: ((token) => this.onSuccessfulToken(token))
    });
  }

  onClick(e) {
    e.preventDefault();

    this.handler().open({
      name: "Doorbell",
      description: "Subscription",
      panelLabel: "Subscribe",
      allowRememberMe: false,
      email: AuthenticationStore.getState().user.get("email")
    });
  }

  render() {
    return (
      <div>
        {this.state.scriptLoading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={this.onClick.bind(this)}>New card</button>
        )}
      </div>
    );
  }

}

reactMixin(StripeCheckoutButton.prototype, ReactScriptLoaderMixin);
