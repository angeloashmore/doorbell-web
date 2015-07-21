import React from 'react';
import { Link, RouteHandler } from 'react-router';
import Radium from 'radium';

import colors from 'styles/colors';

import { Header, Notifications } from 'components';
import { Container, Footerbar } from 'elements';

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

        <div style={styles.footerbar}>
          <Footerbar
            leftItems={[
              <Footerbar.Button>Home</Footerbar.Button>,
              <Footerbar.Button>About</Footerbar.Button>,
              <Footerbar.Button>Support</Footerbar.Button>
            ]}
            rightItems={[
              <Footerbar.Button>Version 0.1.0</Footerbar.Button>,
              <Footerbar.Button>Copyright Doorbell Technologies.</Footerbar.Button>,
            ]}
            />
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
    cursor: "default",
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
    flexShrink: 0
  },

  footerbar: {
    flexShrink: 0
  }
};
