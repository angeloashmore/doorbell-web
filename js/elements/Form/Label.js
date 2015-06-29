import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <label style={styles.label}>
        <span style={styles.title}>
          {this.props.title}
        </span>
        {this.props.children}
      </label>
    );
  }
}

const styles = {
  label: {
    alignContent: "stretch",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20
  },

  title: {
    color: colors.get("text"),
    letterSpacing: 1,
    fontSize: 14,
    marginBottom: 10,
    textTransform: "uppercase"
  }
}
