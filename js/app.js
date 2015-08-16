import React, { Component } from 'react';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import logger from 'redux-logger';

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import Main from 'containers/Main';
import * as Auth from 'containers/Auth';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        { () =>
          <Router history={history}>
            <Route path='/' component={Main}>
              <Route path='signIn' component={Auth.SignIn} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
