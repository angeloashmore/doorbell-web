import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';

import Notifications from 'components/Notifications';
import Header from 'components/Header';

import colors from 'styles/colors';

@Radium
export default class extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <div style={styles.notifications}>
          <Notifications />
        </div>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.body}>
          <RouteHandler />
        </div>
      </div>
    );
  }
}

const styles = {
  app: {
    alignItems: "stretch",
    backgroundColor: colors.get("background"),
    color: colors.get("text"),
    display: "flex",
    flexFlow: "column nowrap",
    fontSize: 16,
    height: "100%",
    position: "relative",
    width: "100%"
  },

  notifications: {
    left: "50%",
    marginLeft: -325,
    position: "absolute",
    top: 32,
    width: 650,
    zIndex: 1
  },

  header: {
    flexShrink: 0,
    width: "100%"
  },

  body: {
    display: "flex",
    flexGrow: 1
  }
};
