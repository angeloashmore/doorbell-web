import React from "react";
import Radium from "radium";
import Color from "color";

import Heading from "./Heading";
import Item from "./Item";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Heading = Heading;
  static Item = Item;

  render() {
    return (
      <div
        style={[
          styles.masterPanel,
          this.props.style
        ]}
        >
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  masterPanel: {
    backgroundColor: colors.get("white"),
    borderRight: `1px solid ${colors.get("shadow")}`,
    flexShrink: 0,
    minWidth: 200,
    maxWidth: 300,
    overflowY: "auto",
    paddingLeft: 20,
    width: "20vw"
  }
};
