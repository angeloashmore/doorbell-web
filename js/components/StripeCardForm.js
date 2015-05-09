import React from 'react';
import reactMixin from 'react-mixin';
import ReactScriptLoader from 'react-script-loader';

import config from '../config';

import AuthenticationActions from '../actions/AuthenticationActions';

const ReactScriptLoaderMixin = ReactScriptLoader.ReactScriptLoaderMixin;

export default class StripeCardForm extends React.Component {
  constructor() {
    super();

    this.state = {
      scriptLoading: true,
      scriptLoadError: false,
      errorMessage: ''
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

    const component = this;

    var { router } = this.context;
    var form = React.findDOMNode(this.refs.form);

    this.setState({ errorMessage: null });

    Stripe.card.createToken(form, function(status, response) {
      if (response.error) {
        return component.setState({ errorMessage: response.error.message })
      }

      let token = response.id;
      AuthenticationActions.addCardToken(token)
        .then(() => component.props.onSuccess())
        .fail(function(error) {
          component.setState({ errorMessage: error.message });
          component.props.onFailure(error);
        });
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
          <p>{this.state.errorMessage}</p>
        </form>
      );
    }

    return(
      <div>{content}</div>
    );
  }
}

StripeCardForm.contextTypes = {
  router: React.PropTypes.func
};

reactMixin(StripeCardForm.prototype, ReactScriptLoaderMixin);
