import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import { hoverable } from 'decorators/hoverable';
import HeaderNavItem from 'elements/HeaderNavItem';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

import colors from 'styles/colors';

@hoverable
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

  arrow() {
    if (this.props.hovered) {
      return <img src="/assets/images/triangle-down-open.svg" />
    } else {
      return <img src="/assets/images/triangle-down.svg" />
    }
  }

  signOut() {
    UserActions.logOutUser();
  }

  render() {
    return (
      <HeaderNavItem
        {...this.props.hoverableProps}
        style={[
          styles.navItem,
          this.props.hovered && styles.navItemOpen
        ]}>
        <img src="/assets/images/profilePhoto.png" style={styles.profilePhoto} />
        <div style={styles.profileArrow}>{this.arrow()}</div>

        <nav
          style={[
            styles.menu,
            this.props.hovered && styles.menuOpen
          ]}>
          <ul>
            <li style={styles.linkItem}>
              <Link to="/" key="userMenu__account" style={styles.link}>Your Account</Link>
            </li>
            <li style={[styles.linkItem, styles.linkItemLast]}>
              <span onClick={() => this.signOut()} key="userMenu__signOut" style={styles.link}>Sign Out</span>
            </li>
          </ul>
        </nav>
      </HeaderNavItem>
    );
  }
}

const styles = {
  navItem: {
    borderLeft: `1px solid ${colors.red__dark__20}`,
    cursor: "pointer",
    color: colors.red__dark__20,
    padding: "0 20px",
    position: "relative"
  },

  navItemOpen: {
    backgroundColor: colors.white,
  },

  profilePhoto: {
    borderRadius: "50em",
    display: "block",
    height: 30,
    width: 30
  },

  profileArrow: {
    marginLeft: 10
  },

  menu: {
    backgroundColor: colors.white,
    color: colors.gray,
    display: "none",
    paddingLeft: 20,
    position: "absolute",
    right: 0,
    top: "100%",
    width: 180
  },

  menuOpen: {
    display: "block"
  },

  linkItem: {
    borderBottom: `1px solid ${colors.gray__light}`
  },

  linkItemLast: {
    borderBottomWidth: 0
  },

  link: {
    display: "block",
    padding: "16px 20px 16px 0",
    textDecoration: "none",

    ":hover": {
      color: colors.red
    }
  }
};
