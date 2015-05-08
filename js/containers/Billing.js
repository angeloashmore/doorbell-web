import React from 'react';
import reactMixin from 'react-mixin';

import Parse from '../stores/Parse';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

class Billing extends React.Component {
  constructor() {
    super();

    this.state = {
      plan: ''
    };
  }

  buttonHandler(e) {
    e.preventDefault();

    Parse.Cloud.run('createCustomer',
      {
        email: this.props.user.attributes.email,
        planName: this.state.plan
      }, {
      success: function(result) {
        // result is 'Hello world!'
        console.log(result);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" valueLink={this.linkState('plan')} placeholder="Plan ID" />
          <button type="submit" onClick={this.buttonHandler.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}

reactMixin(Billing.prototype, React.addons.LinkedStateMixin);

export default AuthenticatedComponent(Billing);
