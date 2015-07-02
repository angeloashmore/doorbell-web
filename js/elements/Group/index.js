import React from "react";
import Radium from "radium";

import Item from "./Item";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Item = Item;

  render() {
    return (
      <div
        style={[
          styles.group,
          this.props.style
        ]}>
        <div style={styles.header}>
          {this.props.header}
        </div>

        <div style={styles.children}>
          {this.props.children}
        </div>

        <div style={styles.footer}>
          {this.props.footer}
        </div>
      </div>
    );
  }
}

const styles = {
  group: {
    color: colors.get("text")
  },

  header: {
    color: colors.get("text"),
    display: "block",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 30,
    overflow: "hidden",
    paddingLeft: 30,
    textOverflow: "ellipsis",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  },

  children: {
    alignItems: "stretch",
    backgroundColor: colors.get("white"),
    borderTop: `1px solid ${colors.get("shadow")}`,
    borderBottom: `1px solid ${colors.get("shadow")}`,
    display: "flex",
    flexDirection: "column"
  }
}
