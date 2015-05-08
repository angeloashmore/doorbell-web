import React from 'react';

import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

class Billing extends React.Component {
  render() {
    return(
      <div>Billing page</div>
    );
  }
}

export default AuthenticatedComponent(Billing);
