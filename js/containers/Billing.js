import React from 'react';
import reactMixin from 'react-mixin';
import ReactScriptLoader from 'react-script-loader';

import config from '../config';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

const ReactScriptLoaderMixin = ReactScriptLoader.ReactScriptLoaderMixin;

class Billing extends React.Component {
  constructor() {
    super();

    this.state = {
      scriptLoading: true,
      scriptLoadError: false
    };
  }

  getScriptURL() {
    return 'https://js.stripe.com/v2/';
  }

  onScriptLoaded() {
    this.setState({ scriptLoading: false });
    Stripe.setPublishableKey(config.Stripe.PUBLISHABLE_KEY);
  }

  onScriptError() {
    this.setState({ scriptLoading: false, scriptLoadError: true });
  }

  onSubmit(e) {
    e.preventDefault();

    var { router } = this.context;
    var form = React.findDOMNode(this.refs.form);

    Stripe.card.createToken(form, function(status, response) {
      if (response.error) {
        return console.log(status, response);
      }

      AuthenticationActions.addCardToken(response.id)
        .then(() => router.transitionTo('dashboard'));
    });
  }

  render() {
    var content;

    if (this.state.scriptLoading) {
      content = 'Loading Stripe...';

    } else if (this.state.scriptLoadError) {
      content = 'Loading failed...';

    } else {
      content = (
        <form ref="form">
          <input type="text" data-stripe="number" />
          <input type="text" data-stripe="cvc" />
          <input type="text" data-stripe="exp-month" />
          <input type="text" data-stripe="exp-year" />
          <button onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
      );
    }

    return(
      <div>{content}</div>
    );
  }
}

Billing.contextTypes = {
  router: React.PropTypes.func
};

reactMixin(Billing.prototype, ReactScriptLoaderMixin);

export default AuthenticatedComponent(Billing);
