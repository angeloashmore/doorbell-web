import React from "react";
import Radium from "radium";

import Heading from "./Heading";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Heading = Heading;

  render() {
    return (
      <div style={styles.sheet}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  sheet: {
    backgroundColor: colors.white,
    padding: 45,
    width: 260
  }
};
