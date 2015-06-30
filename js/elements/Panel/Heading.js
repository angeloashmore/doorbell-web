import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <span style={styles.heading}>
        {this.props.children}
      </span>
    );
  }
}

const styles = {
  heading: {
    color: colors.get("text"),
    display: "block",
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "uppercase",
    whiteSpace: "nowrap"
  }
}
