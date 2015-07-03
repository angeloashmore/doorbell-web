import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        style={[
          styles.item,
          this.props.last && styles.last,
          this.props.style
        ]}>
        <div style={styles.children}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = {
  item: {
    borderBottom: `1px solid ${colors.get("divider")}`,
    color: colors.get("tint"),
    display: "flex",

    ":hover": {
      color: colors.get("tintAlt"),
      cursor: "pointer"
    }
  },

  title: {
    color: colors.get("text"),
    flexShrink: 0,
    marginRight: 20,
    width: 100
  },

  children: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    overflow: "hidden",
    padding: "16px 30px",
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },

  last: {
    borderBottom: 0
  }
}
