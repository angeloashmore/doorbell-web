import React from "react";
import Radium from "radium";

import Item from "./Item";
import Button from "./Button";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Item = Item;
  static Button = Button;

  render() {
    return (
      <div
        style={[
          styles.group,
          this.props.last && styles.last,
          this.props.style
        ]}>
        {this.props.header !== undefined ? (
          <div style={styles.header}>
            {this.props.header}
          </div>
        ) : ""}

        <div style={styles.children}>
          {this.props.children}
        </div>

        {this.props.footer !== undefined ? (
          <div style={styles.footer}>
            {this.props.footer}
          </div>
        ) : ""}
      </div>
    );
  }
}

const styles = {
  group: {
    color: colors.get("text"),
    flexShrink: 0,
    margin: "30px 30px 0 30px"
  },

  last: {
    margin: "30px"
  },

  header: {
    color: colors.get("text"),
    display: "block",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 10,
    overflow: "hidden",
    paddingLeft: 20,
    textOverflow: "ellipsis",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },

  footer: {
    color: colors.get("text"),
    display: "block",
    fontSize: 14,
    marginTop: 10,
    paddingLeft: 20,
  },

  children: {
    alignItems: "stretch",
    backgroundColor: colors.get("white"),
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
  }
}
