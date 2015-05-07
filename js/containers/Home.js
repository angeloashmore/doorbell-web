import React from 'react/addons';

import Parse from '../stores/Parse';
import AuthenticatedComponent from '../decorators/AuthenticatedComponent';

export default class extends React.Component {
  componentDidMount() {
    Parse.Cloud.run('hello', {}, {
      success: function(result) {
        // result is 'Hello world!'
        console.log(result);
      },
      error: function(error) {
      }
    });
  }

  render() {
    return (
      <div>
        <p>Welcome to the home page</p>
      </div>
    );
  }
}
