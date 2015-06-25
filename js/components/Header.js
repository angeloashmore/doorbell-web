import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import UserStore from 'stores/UserStore';

import UserMenu from 'components/UserMenu';
import HeaderNavItem from 'elements/HeaderNavItem';
import colors from 'styles/colors';

@connectToStores
@Radium
export default class extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores(props) {
    return UserStore.getState();
  }

  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      userMenuOpen: false,
      userMenuHover: false
    };
  }

  handleUserMenu() {
    this.setState({ userMenuOpen: !this.state.userMenuOpen });
  }

  handleUserMouseOver() {
    this.setState({ userMenuHover: true });
  }

  handleUserMouseOut() {
    this.setState({ userMenuHover: false });
  }

  navSignedIn() {
    return (
      <ul style={styles.navigationItems}>
        <HeaderNavItem link="true" to="teams">Teams</HeaderNavItem>
        <HeaderNavItem link="true" to="support">Support</HeaderNavItem>
        <UserMenu />
      </ul>
    );
  }

  navSignedOut() {
    return (
      <ul style={styles.navigationItems}>
        <HeaderNavItem link="true" to="support">Support</HeaderNavItem>
        <HeaderNavItem link="true" to="signup">Register</HeaderNavItem>
        <HeaderNavItem link="true" to="login">Sign In</HeaderNavItem>
      </ul>
    );
  }

  render() {
    return (
      <header style={styles.header}>
        <h1 style={styles.logo}>
          <Link to="teams" style={styles.logo__link}>Doorbell</Link>
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
  },

  userMenu: {
    borderLeft: "1px solid",
    cursor: "pointer",
    color: colors.red__dark__20,
    padding: "0 20px"
  },

  userMenuHover: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },

  profilePhoto: {
    borderRadius: "50em",
    display: "block",
    height: 30,
    width: 30
  },

  profileArrow: {
    marginLeft: 10
  }
};
