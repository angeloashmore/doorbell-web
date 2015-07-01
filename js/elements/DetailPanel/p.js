import React from "react";
import Radium from "radium";

@Radium
export default class extends React.Component {
  render() {
    return (
      <div
        style={[
          styles.p,
          this.props.style
        ]}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  p: {
    marginBottom: 20
  }
}
