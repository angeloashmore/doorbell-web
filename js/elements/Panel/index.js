import React from "react";
import Radium from "radium";

import Heading from './Heading';
import TextPronounced from './TextPronounced';

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  static Heading = Heading;
  static TextPronounced = TextPronounced;

  render() {
    return (
      <div style={[
        styles.panel,
        this.props.style
      ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  panel: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: 45
  }
};
