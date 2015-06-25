import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import colors from "styles/colors";

@Radium
export default class NavigationItem extends React.Component {
  render() {
    return (
      <li style={styles.item}>
        <Link
          to={this.props.to}
          style={[
            styles.link,
            this.props.first && styles.first,
            this.props.last && styles.last,
            this.props.active && styles.active
          ]}>
          <span>{this.props.title}</span>
        </Link>
      </li>
    );
  }
}

const styles = {
  item: {
    alignContent: "stretch",
    display: "flex",
  },

  link: {
    alignItems: "center",
    color: colors.red__dark,
    display: "flex",
    lineHeight: "100%",
    padding: "0 10px",
    textDecoration: "none",

    ":hover": {
      color: colors.white
    }
  },

  first: {
    paddingLeft: 20
  },

  last: {
    paddingRight: 20
  },

  active: {
    color: colors.white
  }
}
