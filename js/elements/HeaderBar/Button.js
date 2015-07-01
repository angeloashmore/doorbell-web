import React from 'react';
import Radium from 'radium';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        {...this.props}
        style={[
          styles.button,
          this.props.disabled && styles.disabled,
          this.props.style
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  button: {
    alignItems: "center",
    color: colors.get("tint"),
    cursor: "pointer",
    display: "flex",
    lineHeight: "100%",
    padding: 20,
    textDecoration: "none",

    ":hover": {
      color: colors.get("tintAlt")
    }
  },

  disabled: {
    color: colors.get("textUnpronounced"),
    cursor: "auto",

    ":hover": {
      color: colors.get("textUnpronounced")
    }
  }
}
