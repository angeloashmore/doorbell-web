import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <button
        {...this.props}
        type="submit"
        style={styles.button}
        >
        {this.props.title}
      </button>
    );
  }
}

const styles = {
  button: {
    backgroundColor: colors.red,
    borderRadius: 5,
    color: colors.white,
    letterSpacing: 1,
    padding: "13px 15px",
    textAlign: "center",
    textTransform: "uppercase",

    ":hover": {
      backgroundColor: colors.red__dark__20
    }
  }
}
