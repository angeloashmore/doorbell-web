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
    color: colors.get("text"),
    cursor: "pointer",
    fontSize: 14,
    lineHeight: "100%",
    padding: 15,
    textDecoration: "none",

    ":hover": {
      color: colors.get("tint")
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
