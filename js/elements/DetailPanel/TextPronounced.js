import React from "react";
import Radium from "radium";

import colors from "styles/colors";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        style={[
          styles.textPronounced,
          this.props.style
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  textPronounced: {
    fontSize: 24
  }
}
