import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <Link
        {...this.props}
        style={[
          styles.link,
          this.props.disabled && styles.disabled,
          this.props.style
        ]}>
        {this.props.children}
      </Link>
    );
  }
}

const styles = {
  link: {
    color: colors.get("tint"),
    lineHeight: "100%",
    padding: 20,
    textDecoration: "none",
    verticalAlign: "bottom",

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
