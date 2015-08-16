import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import colors from 'styles/colors';

import { Header, Notifications } from 'components';
import { Container, Footerbar } from 'elements';

@Radium
export default class Main extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <div style={styles.notifications}>
          <Notifications notifications={this.props.notifications} />
        </div>

        <div style={styles.header}>
          <Header user={this.props.user} />
        </div>

        <Container>
          {this.props.children}
        </Container>

        <div style={styles.footerbar}>
          <Footerbar
            leftItems={[
              <Footerbar.Link to="/" key="home">Home</Footerbar.Link>,
              <Footerbar.Link to="/" key="about">About</Footerbar.Link>,
              <Footerbar.Link to="/" key="support">Support</Footerbar.Link>
            ]}
            rightItems={[
              <Footerbar.Link to="/" key="version">Version 0.1.0</Footerbar.Link>,
              <Footerbar.Link to="/" key="copyright">Copyright Doorbell Technologies.</Footerbar.Link>,
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
