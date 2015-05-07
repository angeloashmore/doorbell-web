import React from 'react';
import reactMixin from 'react-mixin';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

export default AuthenticatedComponent(
  class Billing extends React.Component {
    constructor() {
      super();

      this.state = {
        name: '',
        plan: ''
      };
    }

    buttonHandler() {
      console.log(this.state);
    }

    render() {
      return(
        <div>
          <form>
            <input type="text" valueLink={this.linkState('name')} placeholder="Name" />
            <input type="text" valueLink={this.linkState('plan')} placeholder="Plan ID" />
            <button type="submit" onClick={this.buttonHandler.bind(this)}>Submit</button>
          </form>
        </div>
      );
    }
  }
);
