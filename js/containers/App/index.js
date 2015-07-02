import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';

import Notifications from 'components/Notifications';
import Header from 'components/Header';
import Container from 'elements/Container';

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

        <Container>
          <RouteHandler />
        </Container>
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
    fontFamily: "DIN1451W01-Mittelschrif",
    fontSize: 18,
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
    zIndex: 3
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
