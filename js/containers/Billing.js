import React from 'react';
import reactMixin from 'react-mixin';

import Parse from '../stores/Parse';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

class Billing extends React.Component {
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
