import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import connectToStores from 'alt/utils/connectToStores';

import hoverable from 'decorators/hoverable';
import HeaderNavItem from 'elements/HeaderNavItem';
import UserStore from 'stores/UserStore';

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

  constructor(props) {
    super(props);
  }

  arrow() {
    if (this.props.hovered) {
      return <img src="/assets/images/triangle-down-open.svg" />
    } else {
      return <img src="/assets/images/triangle-down.svg" />
    }
  }

  render() {
    return (
      <HeaderNavItem
        {...this.props.hoverableProps}
        onClick={() => this.handleClick()}
        style={[
          styles.menu,
          this.props.hovered && styles.open
        ]}>
        <img src="/assets/images/profilePhoto.png" style={styles.profilePhoto} />
        <div style={styles.profileArrow}>{this.arrow()}</div>
      </HeaderNavItem>
    );
  }
}

const styles = {
  menu: {
    borderLeft: `1px solid ${colors.red__dark__20}`,
    cursor: "pointer",
    color: colors.red__dark__20,
    padding: "0 20px"
  },

  open: {
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
  }
};
