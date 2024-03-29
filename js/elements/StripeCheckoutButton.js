import React from 'react';
import reactMixin from 'react-mixin';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import Radium from 'radium';

import config from 'config';
import { UserStore } from 'stores';

@reactMixin.decorate(ReactScriptLoaderMixin)
@Radium
export default class StripeCheckoutButton extends React.Component {
  constructor() {
    super();

    this.state = {
      scriptLoading: true,
      scriptLoadError: false
    };
  }

  getScriptURL() {
    return "https://checkout.stripe.com/checkout.js";
  }

  onScriptLoaded() {
    this.setState({ scriptLoading: false });
  }

  onScriptError() {
    this.setState({ scriptLoading: false, scriptLoadError: true });
  }

  onSuccessfulToken(token) {
    this.props.onSuccess(token);
  }

  handler() {
    return StripeCheckout.configure({
      key: config.Stripe.PUBLISHABLE_KEY,
      token: ((token) => this.onSuccessfulToken(token))
    });
  }

  onClick(e) {
    e.preventDefault();

    const { user } = UserStore.getState();

    this.handler().open({
      name: "Doorbell",
      description: "Subscription",
      panelLabel: "Add Card",
      allowRememberMe: false,
      email: user.email
    });
  }

  render() {
    return (
      <div
        style={[
          styles.container,
          this.state.scriptLoading && styles.loading,
          this.props.style
        ]}>
        {this.state.scriptLoading ? (
          <span style={styles.loadingMessage}>
            Loading&hellip;
          </span>
        ) : (
          <span style={styles.button} onClick={this.onClick.bind(this)}>
            {this.props.title}
          </span>
        )}
      </div>
    );
  }

}

const styles = {
  container: {
    alignItems: "stretch",
    alignContent: "stretch",
    display: "flex",
    flexGrow: 1
  },

  loadingMessage: {
    flexGrow: 1
  },

  button: {
    flexGrow: 1
  }
};
