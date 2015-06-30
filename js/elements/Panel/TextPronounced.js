import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <p style={styles.textPronounced}>
        {this.props.children}
      </p>
    );
  }
}

const styles = {
  textPronounced: {
    color: colors.get("textPronounced"),
    display: "block",
    fontSize: 24
  }
}
