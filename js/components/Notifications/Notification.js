import React from 'react';
import Radium from 'radium';

import Actions from 'actions';
import { hoverable } from 'decorators';
import { Icon } from 'elements';

import colors from 'styles/colors';

@hoverable
@Radium
export default class extends React.Component {
  dismiss(id) {
    Actions.Notifications.destroy(id);
  }

  render() {
    return (
      <li
        {...this.props.hoverableProps}
        style={styles.notification}
        >
        <Icon name="notification-alert" style={styles.icon} />
        <span style={styles.message}>{this.props.children}</span>
        <Icon
          name="notification-close"
          selected={this.props.hovered}
          onClick={() => this.dismiss(this.props.id)}
          style={styles.dismiss}
          />
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
    padding: "0 15px"
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
