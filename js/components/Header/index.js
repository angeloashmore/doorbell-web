import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import { UserStore } from 'stores';
import colors from 'styles/colors';

import Item from './Item';
import UserMenu from './UserMenu';

@connectToStores
@Radium
export default class extends React.Component {
  static Item = Item;

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
        <Item link="true" to="teams">Teams</Item>
        <Item link="true" to="support">Support</Item>
        <UserMenu />
      </ul>
    );
  }

  navSignedOut() {
    return (
      <ul style={styles.navigationItems}>
        <Item link="true" to="support">Support</Item>
        <Item link="true" to="signUp">Register</Item>
        <Item link="true" to="signIn">Sign In</Item>
      </ul>
    );
  }

  render() {
    return (
      <header style={styles.header}>
        <h1 style={styles.logo}>
          <Link to={!!this.props.user ? "teams" : "/"} style={styles.logo__link}>Doorbell</Link>
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
    backgroundColor: colors.get("tint"),
    color: colors.get("white"),
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
