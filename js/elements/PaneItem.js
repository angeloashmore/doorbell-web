import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import { hoverable } from "decorators/hoverable";

import colors from "styles/colors";

@hoverable
@Radium
export default class extends React.Component {
  render() {
    return (
      <li
        {...this.props.hoverableProps}
        style={styles.item}
        >
        <Link
          to={this.props.to}
          params={this.props.params}
          query={this.props.query}
          style={[
            styles.link,
            this.props.hovered && styles.linkHovered
          ]}
          >
          {this.props.hovered ? (
            <img src="/assets/images/icon-default-hovered.svg" style={styles.icon} />
          ) : (
            <img src="/assets/images/icon-default.svg" style={styles.icon} />
          )}
          <span style={styles.title}>{this.props.title}</span>
        </Link>
      </li>
    );
  }
}

const styles = {
  item: {
    borderBottom: `1px solid ${colors.gray__light}`
  },

  link: {
    alignItems: "center",
    display: "flex",
    padding: "16px 16px 16px 0",
    textDecoration: "none"
  },

  linkHovered: {
    color: colors.red
  },

  icon: {
    height: 25,
    marginRight: 10,
    width: 25
  }
}
