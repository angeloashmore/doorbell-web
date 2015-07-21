import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import Stores from 'stores';
import Notification from './Notification';
import colors from 'styles/colors';

@connectToStores
@Radium
export default class extends React.Component {
  static Notification = Notification;

  static getStores() {
    return [Stores.Notifications];
  }

  static getPropsFromStores(props) {
    return Stores.Notifications.getState();
  }

  render() {
    const { notifications } = this.props;

    const notificationItems = [];
    for (let id in notifications) {
      notificationItems.push(
        <Notification key={id} id={id}>{notifications[id].message}</Notification>
      );
    }

    return (
      <ul>
        {notificationItems}
      </ul>
    );
  }
}
