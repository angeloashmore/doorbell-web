import React from 'react';

import AuthenticatedComponent from '../../decorators/AuthenticatedComponent';
import AuthenticationStore from '../../stores/AuthenticationStore';

export default AuthenticatedComponent(
  class extends React.Component {
    render() {
      return (
        <div>
          <dl>
            <dt>Name</dt>
            <dd>{this.props.user.get("name")}</dd>
            <dt>Email</dt>
            <dd>{this.props.user.get("email")}</dd>
          </dl>
        </div>
      );
    }
  }
);
