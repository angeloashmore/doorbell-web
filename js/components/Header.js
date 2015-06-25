import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import NavigationItem from 'elements/NavigationItem';
import colors from 'styles/colors';

import UserStore from 'stores/UserStore';

@connectToStores
@Radium
export default class Header extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores(props) {
    return UserStore.getState();
  }

  static contextTypes = {
    router: React.PropTypes.func
  }

  navSignedIn() {
    return (
      <ul style={styles.navigationItems}>
        <NavigationItem to="/" title="Teams" first="true" active="true" />
        <NavigationItem to="/" title="Support" last="true" />
      </ul>
    );
  }

  navSignedOut() {
    return (
      <ul style={styles.navigationItems}>
        <NavigationItem to="/" title="Register" first="true" />
        <NavigationItem to="/" title="Sign In" last="true" />
      </ul>
    );
  }

  render() {
    return (
      <header style={styles.header}>
        <h1 style={styles.logo}>
          <Link to="/" style={styles.logo__link}>Doorbell</Link>
        </h1>
        <nav style={styles.nav}>
          {!!this.props.user ? this.navSignedIn() : this.navSignedOut()}
        </nav>
      </header>
    );
  }
}

const styles = {
  header: {
    alignContent: "stretch",
    backgroundColor: colors.red,
    color: "#fff",
    display: "flex"
  },

  logo: {
    fontSize: 20,
    lineHeight: "100%",
    fontWeight: "normal",
    textTransform: "uppercase",
    flexGrow: 1
  },

  logo__link: {
    display: "inline-block",
    padding: 20,
    textDecoration: "none"
  },

  nav: {
    display: "flex",
    alignItems: "stretch",
    flexShrink: 0
  },

  navigationItems: {
    display: "flex"
  }
};
