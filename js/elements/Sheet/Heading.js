import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <span
        style={[
          styles.heading,
          this.props.style
        ]}>
        {this.props.children}
      </span>
    );
  }
}

const styles = {
  heading: {
    color: colors.get("textPronounced"),
    display: "block",
    fontSize: 42,
    marginBottom: 30,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}
