import React from 'react';
import ReactScriptLoader from 'react-script-loader';

import config from '../config';

import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

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
    UserActions.addCardToken(token.id)
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
      email: UserStore.getState().user.get("email")
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
