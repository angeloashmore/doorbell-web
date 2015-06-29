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
    backgroundColor: colors.get("tint"),
    borderRadius: 5,
    color: colors.get("white"),
    letterSpacing: 1,
    marginTop: 10,
    padding: "13px 15px",
    textAlign: "center",
    textTransform: "uppercase",

    ":hover": {
      backgroundColor: colors.get("tintAction")
    }
  }
}
