import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <input
        {...this.props}
        style={[
          styles.input,
          this.props.style
        ]}>
        />
    );
  }
}

const styles = {
  input: {
    border: `1px solid ${colors.get("text")}`,
    borderRadius: 5,
    color: colors.get("textPronounced"),
    fontFamily: "inherit",
    fontSize: 16,
    fontSmoothing: "antialiased",
    margin: 0,
    padding: "13px 15px",

    ":focus": {
      border: `1px solid ${colors.get("tint")}`
    }
  }
}
