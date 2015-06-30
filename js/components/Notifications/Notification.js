import React from 'react';
import Radium from 'radium';

import NotificationsActions from 'actions/NotificationsActions';

import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  dismiss(id) {
    NotificationsActions.destroy(id);
  }

  render() {
    return (
      <li style={styles.notification}>
        <img src="/assets/images/icons/notification-alert.svg" style={styles.icon} />
        <span style={styles.message}>{this.props.children}</span>
        <img src="/assets/images/icons/notification-close.svg" style={styles.dismiss} onClick={() => this.dismiss(this.props.id)} />
      </li>
    );
  }
}

const styles = {
  notification: {
    alignItems: "center",
    alignContent: "center",
    backgroundColor: colors.get("notificationBackground"),
    borderRadius: 5,
    boxShadow: `0 0 0 1px ${colors.get("shadow")}, 0 2px 4px ${colors.get("shadow")}`,
    color: colors.get("notificationText"),
    display: "flex",
    flexWrap: "nowrap",
    height: 55,
    justifyContent: "space-between",
    marginBottom: 10,
    padding: "0 15px",
  },

  icon: {
    flexShrink: 0,
    marginRight: 15
  },

  message: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },

  dismiss: {
    cursor: "pointer",
    flexShrink: 0,
    marginLeft: 15
  }
};
