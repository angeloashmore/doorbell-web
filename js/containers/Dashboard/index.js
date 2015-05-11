import React from 'react';

import AuthenticatedComponent from 'decorators/AuthenticatedComponent';

export default AuthenticatedComponent(
  class extends React.Component {
    render() {
      return (
        <div>
          <p>Viewing the <strong>protected</strong> Dashboard.</p>
        </div>
      );
    }
  }
);
