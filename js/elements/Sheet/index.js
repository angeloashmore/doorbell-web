import React from "react";
import Radium from "radium";

import colors from "styles/colors";

import { Icon } from "elements";
import Heading from "./Heading";

@Radium
export default class extends React.Component {
  static Heading = Heading;

  render() {
    return (
      <div
        style={[
          styles.sheet,
          this.props.style
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  sheet: {
    backgroundColor: colors.get("white"),
    padding: 45,
    position: "relative",
    width: 310
  }
};
