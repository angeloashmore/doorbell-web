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
        <div style={styles.title}>
          {this.props.title}
        </div>

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
    display: "flex",
    justifyContent: "stretch",
    marginLeft: 30,
    padding: "16px 30px 16px 0"
  },

  title: {
    color: colors.get("textPronounced"),
    flexShrink: 0,
    marginRight: 20,
    width: 100
  },

  children: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
    textAlign: "right",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },

  last: {
    borderBottom: 0
  }
}
