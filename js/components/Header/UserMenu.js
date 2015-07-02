import React from 'react';
import { Navigation, Link } from 'react-router';
import reactMixin from 'react-mixin';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import hoverable from 'decorators/hoverable';
import Item from './Item';
import UserStore from 'stores/UserStore';
import UserActions from 'actions/UserActions';

import colors from 'styles/colors';

@hoverable
@connectToStores
@reactMixin.decorate(Navigation)
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

  signOut() {
    UserActions.signOut()
      .then(() => this.transitionTo('signIn'));
  }

  render() {
    const arrow = <img src={`/assets/images/triangle-down${this.props.hovered ? "-open" : ""}.svg`} />

    return (
      <Item
        {...this.props.hoverableProps}
        style={[
          styles.navItem,
          this.props.hovered && styles.navItemOpen
        ]}>
        <img src="/assets/images/profilePhoto.png" style={styles.profilePhoto} />
        <div style={styles.profileArrow}>{arrow}</div>

        <nav
          style={[
            styles.menu,
            this.props.hovered && styles.menuOpen
          ]}>
          <ul>
            <li style={styles.linkItem}>
              <Link to="/" key="userMenu__account" style={[styles.link, styles.linkFirst]}>Your Account</Link>
            </li>
            <li style={[styles.linkItem, styles.linkItemLast]}>
              <span onClick={() => this.signOut()} key="userMenu__signOut" style={[styles.link, styles.linkLast]}>Sign Out</span>
            </li>
          </ul>
        </nav>
      </Item>
    );
  }
}

const styles = {
  navItem: {
    borderLeft: `1px solid ${colors.get("shadow")}`,
    cursor: "pointer",
    color: colors.get("tintAlt"),
    marginLeft: 20,
    padding: "0 20px 0 25px",
    position: "relative"
  },

  navItemOpen: {
    backgroundColor: colors.get("white"),
    borderLeft: `1px solid ${colors.get("white")}`
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
    backgroundColor: colors.get("white"),
    borderBottom: `1px solid ${colors.get("shadow")}`,
    borderLeft: `1px solid ${colors.get("shadow")}`,
    color: colors.get("text"),
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
    borderBottom: `1px solid ${colors.get("divider")}`
  },

  linkItemLast: {
    borderBottom: 0
  },

  link: {
    display: "block",
    padding: "16px 20px 16px 0",
    textDecoration: "none",

    ":hover": {
      color: colors.get("tint")
    }
  },

  linkFirst: {
    padding: "20px 20px 16px 0"
  },

  linkLast: {
    padding: "16px 20px 20px 0"
  }
};
