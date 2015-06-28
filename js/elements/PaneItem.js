import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import hoverable from "decorators/hoverable";

import colors from "styles/colors";

@hoverable
@Radium
export default class extends React.Component {
  icon() {
    const hoveredTag = (this.props.hovered ? "-hovered" : "");
    const src = `/assets/images/icon-${this.props.icon}${hoveredTag}.svg`;
    return (
      <img
      src={src}
      style={[
        styles.icon,
        this.props.iconOnly && styles.iconIconOnly
      ]}
      />
    );
  }

  render() {
    return (
      <li
        style={[
          styles.item,
          this.props.last && styles.itemLast
        ]}
        >
        <Link
          {...this.props.hoverableProps}
          to={this.props.to}
          params={this.props.params}
          query={this.props.query}
          style={[
            styles.link,
            this.props.hovered && styles.linkHovered,
            this.props.iconOnly && styles.linkIconOnly
          ]}
          >
          {this.icon()}
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

  itemLast: {
    borderBottom: 0
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

  linkIconOnly: {
    display: "inline-flex",
    margin: "16px 16px 16px 0",
    padding: 0
  },

  icon: {
    display: "block",
    height: 25,
    marginRight: 10,
    width: 25
  },

  iconIconOnly: {
    marginRight: 0
  }
}
