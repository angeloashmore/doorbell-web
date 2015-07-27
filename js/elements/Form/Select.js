import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <select
        {...this.props}
        style={[
          styles.input,
          (this.props.chromeless ? styles.chromeless : styles.chrome),
          this.props.chromeless && this.props.hasTitle && styles.hasTitle,
          this.props.style
        ]}
        >
        {this.props.children}
      </select>
    );
  }
}

const styles = {
  input: {
    backgroundColor: "transparent",
    color: colors.get("textPronounced"),
    fontFamily: "inherit",
    fontSize: 18,
    fontSmoothing: "antialiased",
    margin: 0
  },

  chrome: {
    border: `1px solid ${colors.get("text")}`,
    borderRadius: 5,
    padding: "13px 15px",

    ":focus": {
      border: `1px solid ${colors.get("textPronounced")}`
    }
  },

  chromeless: {
    appearance: "none",
    background: "url(/assets/images/icons/down-chevron.svg) no-repeat right center",
    alignSelf: "stretch",
    border: 0,
    display: "flex",
    flexGrow: 1,
    margin: 0,
    padding: 0
  },

  hasTitle: {
    paddingLeft: 0
  }
}
